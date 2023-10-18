const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const Book = require("../models/book");

const jwtVerify = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (authToken) {
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = decodedToken;
  }
  next();
};

router.use(jwtVerify);

router.get("/", async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const book = await Book.findById(id);
  res.send(book);
});

router.post("/", async (req, res) => {
  console.log("Inside book.create function");
  if (req.user && req.user.role === "ADMIN") {
    const book = req.body;
    const dbBook = await Book.create(book);
    res.send(dbBook);
  } else {
    res.status(403).send("Unauthorized from Book.create");
  }
});

// update api call

// router.delete("/:id", (req, res) => {
//   const id = req.params.id;
//   const book = books[id - 1];
//   books.splice(id - 1, 1);
//   res.send(book);
// });

module.exports = router;