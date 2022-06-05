import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../MailAdapter';
require('dotenv/config');

const NODEMAILER_USERNAME = process.env.NODEMAILER_USERNAME;
const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD;

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: NODEMAILER_USERNAME,
    pass: NODEMAILER_PASSWORD,
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <feedget@enterprise.com>',
      to: 'Cassiano Junior <cassianojuniorww@gmail.com>',
      subject,
      html: body,
    });
  }
}
