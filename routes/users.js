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
          console.log(data);
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

// router.get("/qr/:id", (req, res) => {
//   const { id } = req.params;
//   const qrCode = qr.image(`http://localhost:3000/restaurant/${id}`, {
//     type: "png",
//   });
//   res.type("png");
//   qrCode.pipe(res);
// });

module.exports = router;
