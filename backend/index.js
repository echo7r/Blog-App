const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.mongodb");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer"); //used to upload from data i.e files
const uploadMiddleware = multer({ dest: "uploads/" });
const post = require("./models/post.mongodb");
const fs = require("fs");
const port = 3000;

//encypting the password passed by user
const salt = bcrypt.genSaltSync(10);
const secret = "3892u4yieu2khwfkjwhfhs";

//MIDDLEWARES
app.use(cors({ credentials: true, origin: "http://localhost:5173" })); //it helps us to connect our backend to frontend (localhost ports) because by default doing this is blocked by the browsers
app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017/Blog"); //specify the database name otherwise it will take username as database and schema as collection

app.use("/uploads", express.static(__dirname + "/uploads"));

//API
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/register", async (req, res) => {
  const { Username, Password } = req.body; //to extract username and password from the json body that we passed
  try {
    //it will send error when we have a user with the same username
    const userDoc = await User.create({
      Username,
      Password: bcrypt.hashSync(Password, salt), //encrypting the password with random salt
    }); //creating a new user
    res.json(userDoc); //here we request data from the browser
    console.log(userDoc);
    console.log("User Added");
  } catch (e) {
    res.status(400).json(e); //it will send a status with code 400 and send a json with error
    console.log(e);
  }
});

app.post("/login", async (req, res) => {
  const { Username, Password } = req.body;
  const userDoc = await User.findOne({ Username }); //to find username in the database
  const passOk = await bcrypt.compareSync(Password, userDoc.Password);
  if (passOk) {
    //logged in
    jwt.sign({ Username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: userDoc.__id,
        Username,
      });
    });
  } else {
    res.status(400).json("wrong credentials");
    console.log("Password Incorrect");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  {
    token &&
      jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        console.log(info);
        res.json(info);
      });
  }
  res.redirect("/login");
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("TOKEN:", req.cookies.token);

    let newPath = null;

    if (req.file) {
        const { originalname, path } = req.file;

        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];

        newPath = path + "." + ext;

        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;

    jwt.verify(token, secret, {}, async (err, info) => {

        if (err) {
            return res.status(401).json("Invalid token");
        }

        const { title, summary, content } = req.body;

        const postDoc = await post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
        });

        res.json(postDoc);
    });
});

app.get("/post", async (req, res) => {
  res.json(
    await post
      .find()
      .populate("author", ["Username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await post.findById(id).populate("author", ["Username"]);
  res.json(postDoc);
});

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    //to get the file extension
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  //grabbing cookie
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("You Are Not Author");
    }

    await postDoc.update({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });
  });
});

app.listen(port, (req, res) => {
  console.log(`listening on port ${port}`);
});
