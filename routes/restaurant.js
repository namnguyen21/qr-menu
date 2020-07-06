const express = require("express");
const db = require("../models");

const router = express.Router();

router.get("/menu/:id", (req, res) => {
  const { id } = req.params;
  db.users
    .findByPk(id, {
      attributes: ["id", "restaurant"],
      include: [
        {
          model: db.menuItems,
          where: {
            userId: id,
          },
          as: "UserMenuItems",
        },
      ],
    })
    .then((response) => {
      const { dataValues: data } = response;
      // separate data
      const { id, restaurant, UserMenuItems } = data;

      res.json({
        id,
        restaurant,
        menu: UserMenuItems,
      });
    });
});

module.exports = router;
