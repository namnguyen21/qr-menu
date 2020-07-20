const express = require("express");
const qrcode = require("qrcode");
const pdf = require("html-pdf");
const db = require("../models");
const template = require("../pdf/template");

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
  qrcode.toDataURL(`https://${req.headers.host}/restaurant/${id}`, function (
    err,
    url
  ) {
    res.json(url);
  });
});

router.get("/pdf/:id", (req, res) => {
  const { id } = req.params;
  const pdfOptions = {
    height: "400px",
    width: "400px",
  };

  db.users
    .findOne({
      where: {
        id: id,
      },
      attributes: ["restaurant"],
      raw: true,
    })
    .then((response) => {
      const { restaurant } = response;
      qrcode.toDataURL(
        `https://${req.headers.host}/restaurant/${id}`,
        function (err, url) {
          // write pdf using restaurant name and qr code
          pdf.create(template(url), pdfOptions).toStream((err, pdfStream) => {
            if (err) {
              return res.sendStatus(500);
            } else {
              // send a status code of 200 OK
              res.statusCode = 200;

              pdfStream.on("end", () => {
                // done reading
                return res.end();
              });

              // pipe the contents of the PDF directly to the response
              pdfStream.pipe(res);
            }
          });
        }
      );
    });
});

module.exports = router;
