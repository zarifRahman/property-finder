import express from "express";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json())

app.use("/api/posts", postRoute);
app.use(cookieParser());


// Auth
app.use("/api/auth", authRoute);


app.listen(8800, () => {
  console.log("Server is running hh!");
});
