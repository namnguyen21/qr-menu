const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const qr = require("qr-image");
const cloudinary = require("cloudinary").v2;
const db = require("../models");

console.log(process.env);

//cloudinary for file upload
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_NAME,
  api_key: "814754145751996",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
          qrSvg.pipe(require("fs").createWriteStream("qr.png"));
          cloudinary.uploader.upload(
            "qr.png",
            { resource_type: "image" },
            (err, clResult) => {
              if (err) console.log(err);
              else {
                console.log(clResult);
                const { url } = clResult;
                db.qr
                  .create({
                    url,
                    userId: id,
                  })
                  .then((newQr) => {
                    res.json({
                      id,
                      name,
                      email,
                      restaurant,
                      phone,
                      newQr,
                    });
                  });
              }
            }
          );
          // res.json({ id, name, email, restaurant, phone });
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
            restaurant: data.phone,
          });
        } else {
          res.json({ message: "Incorrect Password" });
        }
      }
    });
});

module.exports = router;
