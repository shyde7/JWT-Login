const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jwttestingemail@gmail.com',
        pass: 'fmgo ohoe imnp psrk',
        // pass: jwttestingpassword22222222,
        //generated app password: fmgo ohoe imnp psrk
    }
});

const token = jwt.sign({
    data: 'Token Data'
}, 'secretKey', { expiresIn: '10m' }  
); 

const userEmail = req.body.email;
console.log(userEmail);

const mailConfig = {
    from: 'jwttestingemail@gmail.com',
    //send email to the user email that is given during signup
    // to: userEmail,
    to: 'sean.hyde04@gmail.com',

    subject: 'Email Authentication',

    text: `Hi there! Thank you for signing up for this super legit service!
    Please click the link here to verify your email: http://localhost:3019/verify/${token}`
};

transporter.sendMail(mailConfig, (error, info) => {
    if(error) throw Error(error);

    console.log('Email sent: ' + info.response);
    console.log(info);
});
