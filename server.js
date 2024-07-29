const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3019;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('MongoDB connection successful');
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema); // Use consistent case

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/post', async (req, res) => {
  const { email, password } = req.body;
  const user = new User({
    email,
    password,
  });
  await user.save();
  console.log(user);
  res.send("Form Submitted");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
