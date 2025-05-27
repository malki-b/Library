
const express = require('express');

const booksService = require('../service/booksService');
const pool = require('../../DB/database');
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

async function removeBook(req, res) {
    try {
        const deleted = await booksService.deleteBook(req.params.id);
        res.json(deleted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getBooks,
    createBook,
    updateBook,
    removeBook
};
