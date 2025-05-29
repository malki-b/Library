import usersService from '../service/usersService.js';

async function getAllUsers(req, res) {
    try {
        const users = await usersService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getUser(req, res) {
    try {
        const user = await usersService.getUserByID(req.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createUser(req, res) {
    try {
        const newUserId = await usersService.addUser(req.body);
        const subscriptionNum = await usersService.addSubscriptionNum(newUserId)
        res.status(201).json(subscriptionNum);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateUser(req, res) {
    try {
        const updated = await usersService.updateUser(req.body);
        res.status(201).json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteUser(req, res) {
    try {
        const deleted = await usersService.deleteUser(req.params.id);
        res.json(deleted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function authenticateUser(req, res) {
    try {
        const user = await usersService.getUserBysubscriptionNameAndSubscriptionNum(req.body.name, req.body.subscriptionNum);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const UsersController = {
    getUser,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    authenticateUser
};

export default UsersController;
