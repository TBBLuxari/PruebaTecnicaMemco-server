import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "",
      clientId:"",
      clientSecret:"",
      refreshToken:""
    },
  });




