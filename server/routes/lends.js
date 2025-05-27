import express from 'express';
import lendsController from '../controllers/lends.js'
const lendsRouter = express.Router();
lendsRouter.use(express.json())

lendsRouter.get('/', lendsController.getlends);
lendsRouter.post('/', lendsController.addBook);
lendsRouter.put('/:id', lendsController.updateBook);
lendsRouter.delete('/', lendsController.deleteBook);

export default lendsRouter