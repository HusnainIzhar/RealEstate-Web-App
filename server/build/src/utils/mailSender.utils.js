"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
require("dotenv").config();
const transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    service: process.env.SMTP_SERVICE,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});
// send email
const sendEmail = async (options) => {
    const { email, subject, template, data } = options;
    // get the path to email template
    const templatePath = path_1.default.join(__dirname, "../views/mail-templates/", template);
    //render the template
    const html = await ejs_1.default.renderFile(templatePath, data);
    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: email,
        subject: subject,
        html
    };
    await transporter.sendMail(mailOptions);
};
exports.sendEmail = sendEmail;
