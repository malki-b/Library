import express from 'express';
const booksController = require('../controllers/books.js');
const booksRouter = express.Router();
booksRouter.use(express.json())

booksRouter.get('/', booksController.getBooks);
booksRouter.post('/', booksController.addBook);
booksRouter.put('/', booksController.updateBook);
booksRouter.delete('/:id', booksController.deleteBook);

export default booksRouter