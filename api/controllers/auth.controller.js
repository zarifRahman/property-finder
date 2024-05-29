
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
// import jwt from "jsonwebtoken";
// import prisma from "../lib/prisma";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword", hashedPassword);

    // CREATE A NEW USER AND SAVE TO DB
    const newUser = await prisma?.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }

  console.log("body", req.body);
};
