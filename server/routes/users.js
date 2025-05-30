import express from 'express';
import usersController from '../controllers/users.js'
const usersRouter = express.Router();
usersRouter.use(express.json())

usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:id', usersController.getUser);
usersRouter.post('/', usersController.createUser);
usersRouter.put('/', usersController.updateUser);
usersRouter.delete('/:id', usersController.deleteUser);
usersRouter.post('/login', usersController.authenticateUser);

export default usersRouter