import pool from '../../DB/createConnection.js';
import express from 'express';
const router = express.Router();

async function getAllUsers() {
    const [users] = await pool.query("SELECT * from users");
    return users;
}

async function getUserByID(id) {
    const [user] = await pool.query("SELECT * from users WHERE id=?", [id]);
    return user;
}

async function getUserBysubscriptionNameAndSubscriptionNum(name, subscriptionNum) {
    const [users] = await pool.query("SELECT u.* FROM users u JOIN users_passwords up ON u.id = up.id WHERE up.name = ? AND up.subscription_Num = ?;", [name, subscriptionNum]);
    return users.length > 0 ? users[0] : null;;
}

async function addUser(user) {
    const { name, email, address, role, numOfFamilyMembers, debt } = user;
    const [result] = await pool.query(
        'INSERT INTO users VALUES (?, ?, ?, ?, ?, ?)',
        [name, email, address, role, numOfFamilyMembers, debt]
    );
    return { id: result.insertId, ...user };
}

async function addSubscriptionNum(userId){
    const subscriptionNum = Math.floor(Math.random() * (99999999 - 100000 + 1)) + 100000;
    await pool.query(
        'INSERT INTO users VALUES (?, ?)',
        [userId, subscriptionNum]
    );
    return subscriptionNum;
}

async function updateUser(user) {
    await pool.query(
        'UPDATE users SET name = ? , email = ?, address = ?, role = ?, numOfFamilyMembers = ?, debt = ? WHERE id = ?',
        [user.name, user.email, user.address, user.role, user.numOfFamilyMembers, user.debt, user.id]
    );   
    return user;
}

async function deleteUser(id) {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return { id };
}

export default {
    getAllUsers,
    addUser,
    getUserBysubscriptionNameAndSubscriptionNum,
    addSubscriptionNum,
    updateUser,
    deleteUser,
    getUserByID
};