// const { google } = require("googleapis");
// const { OAuth2 } = google.auth;
const nodemailer = require("nodemailer");
require("dotenv").config();
// const oAuth2Client = new OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URI
// );

// oAuth2Client.setCredentials({
//   refresh_token: process.env.REFRESH_TOKEN,
// });
// const accessToken = oAuth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
  host: "server295.web-hosting.com",
  port: 465,
  secure: true,
  auth: {
    user: "nodemailer@tunatechnology.com",
    pass: ")-L-EBYz}ZXM",
  },
});

module.exports = transporter;
