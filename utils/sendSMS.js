const AfricasTalking = require("africastalking");

// TODO: Initialize Africa's Talking
const africastalking = AfricasTalking({
  apiKey: process.env.AFRICA_KEY,
  username: "sandbox",
});

exports.smsSender = async (object, phoneNumber) => {
  let messageBody = "";
  object.forEach((item) => {
    let tempBody = `${item.transactionType}:  ${item.amount} on the ${item.date}`;
    messageBody += tempBody;
  });

  try {
    const result = await africastalking.SMS.send({
      to: phoneNumber,
      message: messageBody,
      from: "Kudina",
    });
    console.log(result);
  } catch (ex) {
    console.error(ex);
  }
};
