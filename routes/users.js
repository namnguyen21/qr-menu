const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../models");

router.post("/create", (req, res) => {
  db.users
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then(async (response) => {
      // if user found
      if (response) {
        res.json({
          message: "Oops, looks like there is already a user with that email.",
        });
      } else {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const hashedUser = { ...req.body, password: hashedPassword };
        db.users.create(hashedUser).then((user) => {
          const { id, name, email, restaurant, phone } = user.dataValues;
          res.json({ id, name, email, restaurant, phone });
        });
      }
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.users
    .findOne({
      where: {
        email: email,
      },
    })
    .then(async (response) => {
      // if no email found
      if (!response) {
        res.json({ message: "Sorry, no account found with that email." });
      } else {
        const { dataValues: data } = response;
        if (await bcrypt.compare(password, data.password)) {
          res.json({
            id: data.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            restaurant: data.restaurant,
          });
        } else {
          res.json({ message: "Incorrect Password" });
        }
      }
    });
});

//edit user information
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  db.users
    .update(req.body, {
      where: {
        id: id,
      },
      returning: true,
      plain: true,
    })
    .then((response) => {
      db.users
        .findOne({
          where: {
            id: id,
          },
          attributes: ["id", "name", "email", "restaurant", "phone"],
          raw: true,
        })
        .then((user) => {
          res.json(user);
        });
    });
});

module.exports = router;
