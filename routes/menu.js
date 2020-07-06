const express = require("express");
const db = require("../models");

const router = express.Router();

// get all menu items for given restaurant
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  db.menuItems
    .findAll({
      where: {
        userId: userId,
      },
      raw: true,
    })
    .then((response) => {
      res.json(response);
    });
});

// post NEW menu item
router.post("/", (req, res) => {
  db.menuItems.create(req.body).then((response) => res.json(response));
});

router.patch("/edit/:id", (req, res) => {
  const { id: itemId } = req.params;
  db.menuItems
    .update(req.body, {
      where: {
        id: itemId,
      },
      returning: true,
      plain: true,
    })
    .then((response) => {
      db.menuItems
        .findOne({
          where: {
            id: itemId,
          },
          raw: true,
        })
        .then((data) => {
          res.json(data);
        });
    })
    .catch((err) => {
      res.json({ message: "Please try again." });
    });
});

router.delete("/delete/:id", (req, res) => {
  const { id: itemId } = req.params;

  db.menuItems
    .destroy({
      where: {
        id: itemId,
      },
    })
    .then((response) => {
      if (response) {
        res.json(response);
      }
    });
});

module.exports = router;
