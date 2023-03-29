import nodemailer from "nodemailer";
import ejs from "ejs";
import { IMailer } from "../@types";

export class Mailer {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT!),
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendEmailWithNoHTML(config: IMailer.noHTMl.mailConfig): Promise<void> {
    const { from } = config;

    const mailOptions: nodemailer.SendMailOptions = {
      ...config,
      from: `${from ?? "OneMedia, SA"} <${process.env.MAIL_USER}>`,
    };

    await new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (err, info) => {
        if (err) return reject(err);
        else return resolve(info);
      });
    });

    return this.transporter.close();
  }

  async sendEmailWithHTML(config: IMailer.HTML.mailConfig): Promise<void> {
    let { from, htmlPath, htmlData, ...restConfig } = config;

    const mailBodyTemplate = await new Promise<string>((resolve, reject) => {
      return ejs.renderFile(htmlPath, htmlData, (err, str_html) => {
        if (err) return reject(err);
        else return resolve(str_html);
      });
    });

    const mailOptions: nodemailer.SendMailOptions = {
      ...restConfig,
      from: `${from ?? "OneMedia, SA"} <${process.env.MAIL_USER}>`,
      html: mailBodyTemplate,
    };

    await new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (err, info) => {
        if (err) return reject(err);
        else return resolve(info);
      });
    });

    return this.transporter.close();
  }
}
