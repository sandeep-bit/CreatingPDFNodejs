const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
    },
    birthplace: {
      district: {
        type: String,
        required: true,
      },
      nagarpalika: {
        type: String,
        required: true,
      },
      woda: {
        type: String,
        required: true,
      },
    },
    birthDate: {
      year: {
        type: String,
        required: true,
      },
      month: {
        type: String,
        required: true,
      },
      day: {
        type: String,
        required: true,
      },
    },
    fathersName: {
      type: String,
      required: true,
    },
    mothersName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema, "user");
