import pool from '../../DB/createConnection.js';

async function getAllUsers() {
    const [users] = await pool.query("SELECT * from users");
    return users;
}

async function getUserByID(id) {
    const [user] = await pool.query("SELECT * from users WHERE id=?", [id]);
    return user;
}

async function getUserBySubscriberNameAndSubscriberNum(name, subscriberNum) {
    const [users] = await pool.query("SELECT u.* FROM users u JOIN subscriberNum sn ON u.id = sn.id WHERE u.name = ? AND sn.subscriberNum = ?;", [name, subscriberNum]);
    return users.length > 0 ? users[0] : null;;
}

async function addUser(user) {
    const { name, email, address, role, numOfFamilyMembers, debt } = user;
    const [result] = await pool.query(
        'INSERT INTO users(name, email, address, role, numOfFamilyMembers, debt) VALUES (?, ?, ?, ?, ?, ?)',
        [name, email, address, role, numOfFamilyMembers, debt]
    );
    return result.insertId;
}

async function addSubscriberNum(userId, subscriberNum){
    await pool.query(
        'INSERT INTO subscriberNum VALUES (?, ?)',
        [userId, subscriberNum]
    );
    return subscriberNum;
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
    getUserBySubscriberNameAndSubscriberNum,
    addSubscriberNum,
    updateUser,
    deleteUser,
    getUserByID
};