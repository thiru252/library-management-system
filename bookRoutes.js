const express = require("express");
const Book = require("../models/book");
const router = express.Router();


// 1️ CREATE – Insert Book
router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// 2️READ – All Books
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});


// Books by category
router.get("/category/:category", async (req, res) => {
  const books = await Book.find({ category: req.params.category });
  res.json(books);
});


// Books after year 2015
router.get("/year/after2015", async (req, res) => {
  const books = await Book.find({ publishedYear: { $gt: 2015 } });
  res.json(books);
});


// 3️UPDATE – Change copies or category
router.put("/:id", async (req, res) => {
  try {
    if (req.body.availableCopies < 0) {
      return res.status(400).json({ error: "Negative stock not allowed" });
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// 4️DELETE – Remove book if copies = 0
router.delete("/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  if (book.availableCopies !== 0) {
    return res.status(400).json({ error: "Cannot delete book with available copies" });
  }

  await book.deleteOne();
  res.json({ message: "Book deleted" });
});

module.exports = router;