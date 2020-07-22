const express = require("express");
const fs = require("fs");
const db = require("../models");
const multer = require("multer");
const parser = require("csv-parser");

const router = express.Router();
var upload = multer({ dest: "tmp/csv/" });

// get all menu items for given restaurant
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  db.menuItems
    .findAll({
      where: {
        userId: userId,
      },
      raw: true,
      order: [["category", "ASC"]],
    })
    .then((response) => {
      res.json(response);
    });
});

// post NEW menu item
router.post("/", (req, res) => {
  db.menuItems.create(req.body).then((response) => res.json(response));
});

// post using csv file
router.post("/csv/:userId", upload.single("file"), (req, res) => {
  console.log(req.file);
  const { userId } = req.params;
  // path to temporary file
  const { path } = req.file;
  let results = [];
  setTimeout(() => {
    res.json({});
  }, 2000);
  //   fs.createReadStream(path)
  //     .pipe(parser())
  //     .on("data", (data) => {
  //       results.push(data);
  //     })
  //     .on("end", () => {
  //       console.log(results);
  //       // make sure keys are lowercase for db usage
  //       let keys = Object.keys(results[0]);
  //       let lowerKeys = keys.map((key) => {
  //         return key.toLowerCase();
  //       });
  //       let editedResults = [];
  //       for (let i = 0; i < results.length; i++) {
  //         let tempObj = {};
  //         for (let j = 0; j < keys.length; j++) {
  //           tempObj[lowerKeys[j]] = results[i][keys[j]];
  //         }
  //         tempObj.userId = userId;
  //         editedResults.push(tempObj);
  //       }
  //       console.log(editedResults);
  //       db.menuItems
  //         .bulkCreate(editedResults, { raw: true })
  //         .then((response) => {
  //           res.json(response);
  //         })
  //         .catch((err) => {
  //           if (err) res.sendStatus(400);
  //         });
  //     });
  // });

  // router.patch("/edit/:id", (req, res) => {
  //   const { id: itemId } = req.params;
  //   db.menuItems
  //     .update(req.body, {
  //       where: {
  //         id: itemId,
  //       },
  //       returning: true,
  //       plain: true,
  //     })
  //     .then((response) => {
  //       db.menuItems
  //         .findOne({
  //           where: {
  //             id: itemId,
  //           },
  //           raw: true,
  //         })
  //         .then((data) => {
  //           res.json(data);
  //         });
  //     })
  //     .catch((err) => {
  //       res.json({ message: "Please try again." });
  //     });
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
