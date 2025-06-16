import pool from '../../DB/createConnection.js';

async function getLends(queryParams) {
    let query = `SELECT l.id AS id,
        u.id AS subscriberId,
        u.name AS subscriberName,
        b.id AS bookId,
        b.name AS bookName,
        b.img AS bookImg,
        l.lendDate,
        l.returnDate
        FROM lends l
            JOIN users u ON l.subscriberId = u.id
            JOIN books b ON l.bookId = b.id
        WHERE 1=1`;

    const values = [];
    Object.keys(queryParams).forEach(key => {
        if (queryParams[key] != null) {
            query += ` AND ${key} = ?`;
            values.push(queryParams[key]);
        }
        else{
            query += `AND ${key} is null`
        }
    });
    const [lends] = await pool.query(query, values);
    return lends;

}

async function addLend(lend) {
    const { subscriberId, bookId } = lend;
    const [result] = await pool.query(
        'INSERT INTO lends (subscriberId, bookId, lendDate) VALUES (?, ?, NOW())',
        [subscriberId, bookId]
    );
    return { id: result.insertId, ...lend };
}

async function updateLend(lend) {
    await pool.query(
        'UPDATE lends SET returnDate = NOW() WHERE id = ?',
        [lend.id]
    );
    return { ...lend };
}

async function deleteLend(id) {
    await pool.query('DELETE FROM lends WHERE id = ?', [id]);
    return { id };
}

export default {
    getLends,
    addLend,
    updateLend,
    deleteLend,
};