const express = require("express");
const qrcode = require("qrcode");
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
      if (response) {
        const { dataValues: data } = response;
        // separate data
        const { id, restaurant, UserMenuItems } = data;

        res.json({
          id,
          restaurant,
          menu: UserMenuItems,
        });
      }
    });
});

router.get("/qr/:id", (req, res) => {
  const { id } = req.params;
  qrcode.toDataURL(`https://localhost:3000/restaurant/${id}`, function (
    err,
    url
  ) {
    res.json(url);
  });
});

module.exports = router;
