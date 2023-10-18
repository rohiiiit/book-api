require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const bookRouter = require("./routes/book");
const userRouter = require("./routes/user");

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to MongoDB");
});

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const logger = (req, res, next) => {
  console.log(`Middleware: Received ${req.method} on ${req.url}`);
  next();
};

const secondLogger = (req, res, next) => {
  console.log(`Second Middleware: Received ${req.method} on ${req.url}`);
  next();
};

app.use(express.json());
app.use(logger);

app.use("/api/books", bookRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});