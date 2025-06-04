import pool from '../../DB/createConnection.js';
import express from 'express';
const router = express.Router();

async function getAllLends(queryParams) {
    let query = `SELECT l.id AS id,
        u.id AS subscriptionId,
        u.name AS subscriberName,
        b.id AS bookId,
        b.name AS bookName,
        l.lendDate,
        l.returnDate
        FROM lends l
            JOIN users u ON l.subscriptionId = u.id
            JOIN books b ON l.bookId = b.id
        WHERE 1=1;`;
    const values = [];
    Object.keys(queryParams).forEach(key => {
        query += ` AND ${key} = ?`;
        values.push(queryParams[key]);
    });
    const [lends] = await pool.query(query);
    return lends;
}

async function addLend(lend) {
    const { subscriptionId, bookId, lendDate, returnDate } = lend;
    const [result] = await pool.query(
        'INSERT INTO lends (subscriptionId, bookId, lendDate, returnDate) VALUES (?, ?, ?, ?)',
        [subscriptionId, bookId, lendDate, returnDate]
    );
    return { id: result.insertId, ...lend };
}

async function updateLend(lend) {
    await pool.query(
        'UPDATE lends SET subscriptionId = ? , bookId = ?, lendDate = ?, returnDate = ?  WHERE id = ?',
        [lend.subscriptionId, lend.bookId, lend.lendDate, lend.returnDate, lend.id]
    );
    return { ...lend };
}

async function deleteLend(id) {
    await pool.query('DELETE FROM lends WHERE id = ?', [id]);
    return { id };
}

export default {
    getAllLends,
    addLend,
    updateLend,
    deleteLend,
};