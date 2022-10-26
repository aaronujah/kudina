const dotenv = require("dotenv");
const express = require("express");
dotenv.config({ path: "./config.env" });
const bodyParser = require("body-parser");

app = express();
port = process.env.PORT || 3000;

const connectDB = require("./db/connect");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const catchAsync = require("./utils/catchAsync");
const Session = require("./models/Session");
const User = require("./models/User");
const Transaction = require("./models/Transaction")
const sms = require("./utils/sendSMS");

app.post(
  "/ussd",
  catchAsync(async (req, res) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;

    let response = "";

    let user = await User.findOne({ phoneNumber : `${phoneNumber}` });

    if (text == "" && user) {
      response = `CON Welcome to Kudina what do you want to do?
      1. Check balance
      2. Transactions
      3. Check Adashe/Contribution
      4. Check Loan Information`;
    } else if (text == "1" && user) {
      response = `CON Enter Your Secret Pin`;
    } else if (text == "2" && user) {
      response = `CON Enter Your Secret Pin`;
    } else if (text == "3" && user) {
      response = `END Visit our agent to set up Your Adashe/Contribution`;
    } else if (text == "4" && user) {
      response = `END You are not yet eligible to receive loans`;
    } else if (text == `1*${user.ussdPin}` && user) {
      response = `END Your current savings balance is : ${user.savingsBalance}`
    } else if (text == `2*${user.ussdPin}` && user) {
      transactions = await Transaction.find({ createdBy: user._id })
      await sms.smsSender(transactions, phoneNumber)
      response = `END An SMS with Your most recent transactions will be sent to your phone`
    } else if (text == "" && user == null) {
      response = `END Welcome to Kudina. The Financial platform for the common woman.
      Visit our nearest agent to get started`
    }

    // req.body.user = user._id;
    // await Session.create(req.body);
    console.log(response)

    res.set("Content-Type: text/plain");
    res.send(response);
  })
);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
