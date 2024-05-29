
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
// import prisma from "../lib/prisma";
import cookieParser from "cookie-parser";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword", hashedPassword);

    // CREATE A NEW USER AND SAVE TO DB
    const newUser = await prisma.user.create({
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

export const login = async (req, res) => {
  const { username, password } = req.body;
	try {
    // CHECK IF THE USER EXISTS
    const user = await prisma.user.findUnique({
      where: { username },
    });
    console.log("user:::", user);
    if (!user) return res.status(400).json({ message: "Invalid Credentials!" });

    // CHECK IF THE PASSWORD IS CORRECT
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Password!" });

    // GENERATE COOKIE TOKEN AND SEND TO THE USER
    
		// cookie expire time
    const age = 1000 * 60 * 60 * 24 * 7;
		//  User information are stored in this  token
		const token = jwt.sign(
			{
				id: user.id,
				isAdmin: false,
			},
			process.env.JWT_SECRET_KEY,
			{ expiresIn: age }
		);


    // res.setHeader("set-Cookie", "test=" + "myValue").json("success")
    res
      .cookie("token", token, {
        httpOnly: true,
        // This is for https
        // secure: true
        maxAge: age,
      })
      .status(200)
      .json({ message: "Login Successful" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login!" });
  }
}

export const logout = (req, res) => {
	// CLEAR THE COOKIE
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
