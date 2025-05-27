// const pool = require('../../DB/database');
// const express = require('express');
// const router = express.Router();
import pool from '../../DB/createConnection.js';
import express from 'express';
const router = express.Router();


async function getAllLends(queryParams) {
    
  let query = 'SELECT * FROM lends WHERE 1=1';
  const values = [];
  Object.keys(queryParams).forEach(key => {
    query += ` AND ${key} = ?`;
    values.push(queryParams[key]);
  });
    const [lends] = await pool.query(query);
    return lends;
}

async function addLend(lend) {
    const { subscriptionId, bookId,lendDate, returnDate } = lend;
    const [result] = await pool.query(
        'INSERT INTO lends (subscription_Id, book_Id, lend_Date, return_Date) VALUES (?, ?, ?, ?)',
        [ subscriptionId, bookId,lendDate, returnDate ]
    );
    return { id: result.insertId, ...lend };
}

async function updateLend(lend) {
    await pool.query(
        'UPDATE lends SET name = ? , authorName = ?, category = ?, img = ? cost = ?, shelf = ? WHERE id = ?',
        [lend.name, lend.authorName, lend.category, lend.img, lend.cost, lend.shelf, lend.id]
    );   
    return { ...lend };
}

async function deleteLend(id) {
    await pool.query('DELETE FROM lends WHERE id = ?', [id]);
    return { id };
}

// module.exports = {
//     getAllLends,
//     addLend,
//     updateLend,
//     deleteLend
// };


export default {
    getAllLends,
    addLend,
    updateLend,
    deleteLend,
  };