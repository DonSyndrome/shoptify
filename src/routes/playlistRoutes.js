"use strict";

let express = require("express"),
    router = express.Router(),
    playlistYup = require("../models/playlistYup")

var Playlist = require('../models/playlist');


// To Add New Playlist
router.post("/", async (req, res, next) => {
  let requestBody = req.body;
  try {
    playlistYup.validate(requestBody);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);

  }
  let playlist = new Playlist(requestBody);
  playlist.save((error, newDocument) => {
    if (error) {
      // if (error.code === 11000) {
      //   return res.status(400).send('playlist Slug alrady exist');
      // }
      res.status(400).send(error);
    } else {
      res.status(200).send(newDocument);
    }
  });
});


// To GET ALL Playlist (without mongoose-paginate)-working
router.get("/", (req, res, next) => {
  Playlist.find(
    {},
    null,
    {
      sort: { createdAt: -1 }
    },
    (err, docs) => {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(docs);
      }
    }
  );
});

// To GET spesiphic Playlist-working
router.get("/:id", (req, res, next) => {
  Playlist.findOne(
    {
      "playlist_slug":req.params.id,
    },
    null,
    {},
    (err, docs) => {
      if (err) {
        return next(err);
      } else {
        res.status(200).json(docs);
      }
    }
  );
});


// // Edit/update by department's _id - Working
// router.put("/:id", (req, res) => {
//   Department.findByIdAndUpdate(
//     req.params.id,
//     {
//       $set: {
//         name: req.body.name,
//         type: req.body.type
//       }
//     },
//     { new: true },
//     (err, updatedRecord) => {
//       if (err) {
//         console.error(err);
//         res.send(err);
//       } else {
//         res.status(200).send(updatedRecord);
//       }
//     }
//   );
// });

// // Delete by _id - Working
// router.route("/delete").delete((req, res, next) => {
//   Department.remove(
//     { _id: { $in: req.body.department_id_list_arr } },
//     (err, result) => {
//       if (err) {
//         console.log(err);
//         return next(err);
//       } else {
//         res.status(200).send(result);
//       }
//     }
//   );
// });

module.exports = router;

/*
1> < Department.find({}, "-updatedAt -createdAt -__v", (err, records) > Means exclude updatedAt and createdAt, include other fields

https://mongoosejs.com/docs/api.html#model_Model.find

https://mongoosejs.com/docs/api.html#query_Query-select

2> To Test Delete route in Postman - (http://localhost:3000/api/department/delete)

{
    "department_id_list_arr":["5c5eefa0518f005ac93cb4da", "5c5eef9b518f005ac93cb4d9"]
}

*/
