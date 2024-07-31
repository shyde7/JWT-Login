const express = require("express");
const mongoose = require("mongoose");
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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
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
          res.send("Form successfully submitted");
        })
        .catch((err) => {
          console.error("ERROR: ", err);
          res.status(500).send("ERROR SAVING USER");
        });
    });
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
