const Book = require("../models/book");

const createBook = async (req, res) => {
  try {
    const { title, author, year, genre } = req.body;
    const newBook = new Book({ title, author, year, genre });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar livro" });
  }
};

//getbook
const getBooks = async (_req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar livros" });
  }
};

//getid
const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Livro não encontrado" });
    }
    res.json(book);
  } catch (err) {
    next(err);
  }
};

const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ error: "Livro não encontrado" });
    }
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar livro." });
  }
};

const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: "Livro não encontrado" });
    }
    res.json({ message: "Livro excluído com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao excluir livro" });
  }
};

module.exports = { createBook, getBooks, getBookById, updateBook, deleteBook };