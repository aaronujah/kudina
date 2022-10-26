const mongoose = require("mongoose");

const SessionSchema = mongoose.Schema(
  {
    sessionId: String,
    serviceCode: String,
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Every session must be initiated by a user"],
    },
    text: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", SessionSchema);
