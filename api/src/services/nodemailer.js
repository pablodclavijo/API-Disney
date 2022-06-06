const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    post: 587,
    secure: false,
    auth: {
        user: "cristian.moore44@ethereal.email", 
        pass: "hmAmJRwwFVYknt4bR2"
    }
})

const sendEmail = (addressee) =>{

    const mailOptions = {
        from : "disney Api",
        to: addressee,
        subject: "Welcome!",
        text: "Thank you for subscribing to our API"
    }

    transporter.sendMail(mailOptions, (err, info) =>{
        if(err) return err
        return true
    })
}

module.exports = sendEmail