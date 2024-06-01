import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  // const query = req.query;

  try {
    const posts = await prisma.post.findMany();
    // setTimeout(() => {
    res.status(200).json(posts);
    // }, 3000);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      // include: {
      //   postDetail: true,
      //   user: {
      //     select: {
      //       username: true,
      //       avatar: true,
      //     },
      //   },
      // },
    });

    // const token = req.cookies?.token;
    // if (token) {
    //   jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    //     if (!err) {
    //       const saved = await prisma.savedPost.findUnique({
    //         where: {
    //           userId_postId: {
    //             postId: id,
    //             userId: payload.id,
    //           },
    //         },
    //       });
    //       res.status(200).json({ ...post, isSaved: saved ? true : false });
    //     }
    //   });
    // }
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  // Log the incoming request body
  console.log("Request body:", body);

  // Validate that the required fields are present
  if (!body.title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title: body.title,
        price: body.price,
        img: Array.isArray(body.img) ? body.img : [body.img], // Ensure img is an array
        address: body.address,
        city: body.city,
        bedroom: body.bedroom,
        bathroom: body.bathroom,
        type: body.type,
        property: body.property,
        latitude: body.latitude,
        longitude: body.longitude,
        userId: tokenUserId,
      },
    });
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};


export const updatePost = async (req, res) => {
  try {
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update posts" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
    await prisma.post.delete({
      where: { id },
    });
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
