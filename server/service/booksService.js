import pool from '../../DB/createConnection.js';

async function getAllBooks() {
    const [books] = await pool.query("SELECT b.*, CASE WHEN EXISTS (SELECT 1 FROM lends l WHERE l.bookId = b.id AND l.returnDate IS NULL) THEN 'lent' ELSE 'available' END AS isAvailable FROM books b;");
    return books;
}

async function addBook(book) {
    const { name, authorName, category, img, cost, shelf } = book;
    const [result] = await pool.query(
        'INSERT INTO books (name, authorName, category, img, cost, shelf) VALUES (?, ?, ?, ?, ?, ?)',
        [name, authorName, category, img, cost, shelf]
    );
    return { id: result.insertId, ...book };
}

async function updateBook(book) {
    await pool.query(
        'UPDATE books SET name = ? , authorName = ?, category = ?, img = ?, cost = ?, shelf = ? WHERE id = ?',
        [book.name, book.authorName, book.category, book.img, book.cost, book.shelf, book.id]
    );   
    return book;
}

async function deleteBook(id) {
    await pool.query('DELETE FROM books WHERE id = ?', [id]);
    return { id };
}

export default {
    getAllBooks,
    addBook,
    updateBook,
    deleteBook,
};