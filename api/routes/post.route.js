import express from "express";
// import { verifyToken } from "../middleware/verifyToken.js";
// import {
//   addPost,
//   deletePost,
//   getPost,
//   getPosts,
//   updatePost,
// } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
	console.log("router works")
});

export default router;
