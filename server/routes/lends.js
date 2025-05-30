import express from 'express';
import lendsController from '../controllers/lends.js';

const lendsRouter = express.Router();
lendsRouter.use(express.json())

lendsRouter.get('/', lendsController.getLends);
lendsRouter.post('/', lendsController.createLend);
lendsRouter.put('/', lendsController.updateLend);
lendsRouter.delete('/:id', lendsController.deleteLend);

export default lendsRouter