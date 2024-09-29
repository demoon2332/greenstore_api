import nodemailer from "nodemailer";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

// var mailOptions = {
//   pool: true,
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   tls: {
//     servername: "smtp.gmail.com",
//   },
//   auth: {
//     user: process.env.emailSend,
//     pass: process.env.emailSendPass,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// };


// const myOAuth2Client = new OAuth2Client(
//   process.env.GOOGLE_MAILER_CLIENT_ID,
//   process.env.GOOGLE_MAILER_CLIENT_SECRET
// );
// myOAuth2Client.setCredentials({
//   refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
// });

// const sendMail = async (req, res) => {
//   try {
//     const { email, subject, content } = req.body;
//     if (!email || !subject || !content)
//       throw new Error("Please provide email, subject and content!");
//     const myAccessTokenObject = await myOAuth2Client.getAccessToken();
//     const myAccessToken = myAccessTokenObject?.token;
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         type: "OAuth2",
//         user: process.env.ADMIN_EMAIL,
//         clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
//         refreshToken: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
//         accessToken: myAccessToken,
//       },
//     });
//     const mailOptions = {
//       to: email,
//       subject: subject,
//       html: `<h3>${content}</h3>`,
//     };
//     await transporter.sendMail(mailOptions);
//     return res.status(200).json({ message: "Email sent successfully" });
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({ errors: error.message });
//   }
// };

const transporter = nodemailer.createTransport(
  {
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.GOOGLE_NODEMAILER_GMAIL,
      pass: process.env.GOOGLE_NODEMAILER_PASS
    }
  }
)

function sendMail(to,sub,msg){
  transporter.sendMail({
    to: to,
    subject: sub,
    html: msg
  });
}

sendMail("ductrong1313@gmail.com","This is first subject","<b>Here is bold message</b>");

export { sendMail };
