const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const env= require("dotenv");
env.config();
const path = require("path");
const bcrypt = require("bcryptjs");
const port = 3019;
const saltrounds = 10;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/users", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("MongoDB connection successful");
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Transporter setup for nodemailer to send emails to users when they register
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jwttestingemail@gmail.com',
    pass: 'fmgo ohoe imnp psrk',
  }
});

// Serve static files from the 'styles' directory
app.use(express.static(path.join(__dirname, 'styles')));

// Serve static files from the root directory
app.use(express.static(__dirname));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/verify/:token", (req, res) => {
  const {token} = req.params;

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) {
      res.send("Email verification failed, possibly the link is invalid or expired");
    }
    else {
      res.sendFile(path.join(__dirname, "emailVerification.html"));
    }
  });
});


app.post("/post", async (req, res) => {
  const { email, password } = req.body;

  bcrypt.genSalt(saltrounds, function (err, salt) {
    if (err) {
      console.error("ERROR: ", err);
      return res.status(500).send("ERROR GENERATING SALT");
    }

    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        console.error("ERROR: ", err);
        return res.status(500).send("ERROR GENERATING HASH");
      }
      // Store hash in database
      console.log("Here is the hash:" + hash);



      const user = new User({
        email,
        password: hash, // Storing the hash in the database
      });

      user
        .save()
        .then(() => {
          console.log("User saved successfully");
          console.log("User: ", user);


          //generating JWT token for email verification
          const token = jwt.sign({email:user.email}, 'secretKey', {expiresIn: '10m'});

          // creating config for email with nodemailer
          const mailConfig = {
            from: `${env.email}`,
            to: user.email,
        
            subject: 'Email Authentication',
        
            text: `Hi there! Thank you for signing up for this super legit service!
            Please click the link here to verify your email: http://localhost:3019/verify/${token}`
        };

        // sending email to the user
        transporter.sendMail(mailConfig, (error, info) => {
          if(error){
            console.error("Error sending email: ", error);
            return res.status(500).send("ERROR SENDING EMAIL");
          }
          console.log('Email sent: ' + info.response);
          res.sendFile(path.join(__dirname, "registerSuccess.html"));
        });
      })
        .catch((err) => {
          console.error("ERROR: ", err);
          res.status(500).send("ERROR SAVING USER");
        });
    });
  });
});

app.get("/verify/:token", (req, res) => {
  const { token } = req.params;

  jwt.verify(token, "secretKey", (err, decoded) => {
    if (err) {
      res.send("Email verification failed, possibly the link is invalid or expired");
    } else {
      res.sendFile(path.join(__dirname, "emailVerification.html"));
    }
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const timestamp = new Date().toString();
      return res.json({
        email: user.email,
        password: user.password,
        id: user._id,
        timestamp: timestamp,
      });
    } else {
      return res.status(401).json({ message: "Invalid password" });
    }
  } else {
    return res.status(401).json({ message: "User not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
