import express from 'express';
import usersController from '../controllers/users.js'
const usersRouter = express.Router();
usersRouter.use(express.json())

usersRouter.get('/', usersController.getusers);
usersRouter.post('/', usersController.addBook);
usersRouter.put('/:id', usersController.updateBook);
usersRouter.delete('/:id', usersController.deleteBook);

export default usersRouter