const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter the name of the transaction"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      select: false
    },
    amount: {
      type: Number,
      required: true
    },
    transactionType: {
      type: String,
      enum: ["Paid", "Collected"],
      required: [true, "Enter the transaction type"],
    },
    transactionStatus: {
      type: String,
      enum: ["Successful", "Failed"],
      required: [true, "Enter the transaction status"]
    },
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
