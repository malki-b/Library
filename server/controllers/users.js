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
        const user = await usersService.getUserByID(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createUser(req, res) {
    try {
        let user = req.body;
        const newUserId = await usersService.addUser(user);
        user.id = newUserId;
        const subscriptionNum = Math.floor(Math.random() * 900000) + 100000;
        user.subscriptionNum = subscriptionNum
        console.log(user)
        await usersService.addSubscriptionNum(newUserId, encrypt(subscriptionNum))
        res.status(201).json(user);
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
        const user = await usersService.getUserBysubscriptionNameAndSubscriptionNum(req.body.name, encrypt(req.body.subscriptionNum));
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

function encrypt(number) {
    if (number < 100000 || number > 999999) {
        throw new Error("Number must be a 6-digit number.");
    }

    let encrypted = '';
    const shift = 5;

    for (let digit of String(number)) {
        let encryptedDigit = (parseInt(digit) + shift) % 10; // הצפנה
        encrypted += encryptedDigit;
    }

    return encrypted;
}

function decrypt(encryptedNumber) {
    if (encryptedNumber.length !== 6) {
        throw new Error("Encrypted number must be a 6-digit number.");
    }

    let decrypted = '';
    const shift = 5;

    for (let digit of String(encryptedNumber)) {
        let decryptedDigit = (parseInt(digit) - shift + 10) % 10; // פענוח
        decrypted += decryptedDigit;
    }

    return decrypted;
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
