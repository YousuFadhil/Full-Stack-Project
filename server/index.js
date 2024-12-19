import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import UserModel from "./Models/UserModel.js";
import bcrypt from "bcrypt";

import PostModel from "./Models/Posts.js";

import * as ENV from "./config.js";

const app = express();

app.use(express.json());
app.use(cors());

//db connection
//const connectString = "mongodb+srv://sem120242025:abcd1234@postitcluster.gsgf6.mongodb.net/postITDb?retryWrites=true&w=majority&appName=PostITCluster";

const connectString = `mongodb+srv://mrbashardragon:Bas44853@lastactivy.ey3xc.mongodb.net/act18?retryWrites=true&w=majority&appName=lastActivy`;

//mongodb+srv://sem120242025:<db_password>@postitcluster.gsgf6.mongodb.net/?retryWrites=true&w=majority&appName=PostITCluster
//mongodb+srv://sem120242025:<db_password>@postitcluster.gsgf6.mongodb.net/?retryWrites=true&w=majority&appName=PostITCluster

mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/registerUser", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const hashedpassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      name: name,
      email: email,
      password: hashedpassword,
    });

    await user.save();
    res.send({ user: user, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.put("/updatePost/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const newPostMsg = req.body.postMsg;

    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { postMsg: newPostMsg },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/deletePost/:id", async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedPost = await PostModel.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(500).json({ error: "User not found!" });
    }

    console.log(user);
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    res.status(200).json({ user, message: "Success." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/logout", async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});


//POST API - savePost
app.post("/savePost", async (req, res) => {
  try {
    const postMsg = req.body.postMsg;
    const email = req.body.email;
    const post = new PostModel({
      postMsg: postMsg,
      email: email,
    });
    await post.save();
    res.send({ post: post, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

//GET API - getPost
app.get("/getPosts", async (req, res) => {
  try {
    // Fetch all posts from the "PostModel" collection, sorted by createdAt in descending order
    const posts = await PostModel.find({}).sort({ createdAt: -1 });
    const countPost = await PostModel.countDocuments({});
    res.send({ posts: posts, count: countPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

const port = ENV.PORT || 3001;
app.listen(port, () => {
  console.log(`You are connected at port: ${port}`);
});
