import express from 'express';
import usersController from '../controllers/users.js'
const usersRouter = express.Router();
usersRouter.use(express.json())

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:id', usersController.getUser);
usersRouter.post('/', usersController.addUser);
usersRouter.put('/:id', usersController.updateUser);
usersRouter.delete('/', usersController.deleteUser);
usersRouter.post('/login', usersController.authenticateUser);

export default usersRouter