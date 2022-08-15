const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appartments = new Schema(
  {},
  //   {
  //     image: {
  //       type: String,
  //       required: true,
  //     },
  //     name: {
  //       type: String,
  //       required: true,
  //     },
  //     description: {
  //       type: String,
  //     },
  //   },
  { timestamps: true }
);

const Appartment = mongoose.model("listingsAndReviews", appartments);
module.exports = Appartment;
