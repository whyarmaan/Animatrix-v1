const nodeMailer = require("nodemailer");
const UserModel = require("../models/User");
const sendGrid = require("nodemailer-sendgrid-transport");

exports.postEmail = (email, message, body) => {
  nodeMailer.createTransport(sendGrid({}));
};
