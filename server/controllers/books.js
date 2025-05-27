import express from 'express';
import booksService from '../service/booksService.js';
const router = express.Router()

async function getBooks(req, res) {
    try {
        const books = await booksService.getAllBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createBook(req, res) {
    try {
        const newBook = await booksService.addBook(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateBook(req, res) {
    try {
        const updated = await booksService.updateBook(req.body);
        res.status(201).json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteBook(req, res) {
    try {
        const deleted = await booksService.deleteBook(req.params.id);
        res.json(deleted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const booksController = {
    getBooks,
    createBook,
    updateBook,
    deleteBook
  };
  
  export default booksController;
