const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const db = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@gmail.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
};
const PORT = 3000;
const app = express();
// const getUser = (id) {

// }
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

///
app.get("/", (req, res) => {
  res.json(db.users);
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (email === db.users[0].email && password === db.users[0].password) {
    res.json("success");
  } else {
    res.status(400).json("error logging in");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  db.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.status(200).json(db.users[db.users.length - 1]);
});

app.get("/profile/:userId", (req, res) => {
  if (!req.params) res.status(400).json({ error: "No parameter passed" });
  const { userId } = req.params;
  let found = false;
  db.users.forEach((user) => {
    if (user.id === userId) {
      found = true;
      res.json(user);
    }
  });
  if (!found) res.status(404).json("no such user");
});

app.put("/image", (req, res) => {
  const { id } = req.params;
  let found = false;
  db.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) res.status(404).json("no such user");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}....`);
});
