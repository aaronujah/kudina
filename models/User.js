const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: [true, "Every user must have a phone number"],
    unique: true,
  },
  ussdPin: {
    type: String,
    required: [true, "Please enter a PIN"],
    minlength: 4,
    maxlength: 4,
  },
  savingsBalance: {
    type: Number,
    default: 0.00
  }
});

module.exports = mongoose.model("User", UserSchema);
