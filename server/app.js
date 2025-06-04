import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';
import lendsRouter from './routes/lends.js';
import booksRouter from './routes/books.js'

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json()); 

app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/lends', lendsRouter);
app.use('/', (req, res) => {
    res.send('Unsupported url');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});