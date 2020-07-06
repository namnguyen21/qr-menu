const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const qr = require("qr-image");
const db = require("../models");

router.post("/create", (req, res) => {
  console.log(req.body);
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
          console.log(user);
          const { id, name, email, restaurant, phone } = user.dataValues;
          //create QR code for restaurant route
          const qrSvg = qr.image(`http://localhost:3000/restaurant/${id}`, {
            type: "png",
          });
          qrSvg.pipe(require("fs").createWriteStream("i_love_qr.png"));
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
        if (await bcrypt.compare(req.body.password, data.password)) {
          res.json({
            id: data.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            restaurant: data.phone,
          });
        } else {
          res.json({ message: "Incorrect Password" });
        }
      }
    });
});

module.exports = router;
