const path = require("path");
const User = require("../models/User");
const puppeteer = require("puppeteer");
const fs = require("fs");
const transporter = require("../utils/googlemail");
// const nodemailer = require("nodemailer");
require("dotenv").config();
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD,
//   },
// });
exports.register = async (req, res, next) => {
  const {
    fname,
    lname,
    email,
    birthplace,
    birthDate,
    fathersName,
    mothersName,
  } = req.body;
  const user = new User({
    fname,
    lname,
    email,
    birthplace,
    birthDate,
    fathersName,
    mothersName,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPdf = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto("about:blank");
    let html = ` <style>
    h1 {
      color: #333;
      font-size: 24px;
      text-align: center;
      margin-bottom: 30px;
    }
    table {
      border-collapse: collapse;
      width: 100%;
    }
    th, td {
      padding: 8px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
  <h1>List of Users</h1>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
    <tr>
    <td>${user.fname} ${user.lname}</td>
    <td>${user.email}</td>
  </tr>
  </tbody>
    </table>
`;
    await page.setContent(html, { waitUntil: "networkidle2" });
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "1cm",
        bottom: "1cm",
        left: "1cm",
        right: "1cm",
      },
    });
    await browser.close();
    const filename = `user- ${user._id}.pdf`;
    const filePath = path.join(__dirname, "..", "pdfs", filename);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=" + filename);
    fs.writeFileSync(filePath, pdf);
    res.status(200).send("pdf generated sucessfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.sendmail = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: "User Details",
    html: `<h1>User Details</h1>
    <p>Name: ${user.fname} ${user.lname}</p>
    <p>Email: ${user.email}</p>
    <p>Birthplace: ${user.birthplace}</p>
    <p>BirthDate: ${user.birthDate}</p>`,
    attachments: [
      {
        filename: `user- ${user._id}.pdf`,
        path: path.join(__dirname, "..", "pdfs", `user- ${user._id}.pdf`),
      },
    ],
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
    transporter.close();
  });
  res.status(200).send("Email sent sucessfully");
};
