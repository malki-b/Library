import express from 'express';
import booksController from '../controllers/books.js';

const booksRouter = express.Router();
booksRouter.use(express.json());

booksRouter.get('/', booksController.getBooks);
booksRouter.post('/', booksController.createBook);
booksRouter.put('/', booksController.updateBook);
booksRouter.delete('/:id', booksController.deleteBook);

export default booksRouter;