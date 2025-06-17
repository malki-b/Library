import usersService from '../service/usersService.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

dotenv.config()

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
        const subscriberNum = Math.floor(Math.random() * 900000) + 100000;
        user.subscriberNum = subscriberNum
        await usersService.addSubscriberNum(newUserId, encrypt(subscriberNum))
        res.status(201).json({
            ...user,
            id: newUserId,
            subscriberNum
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateUser(req, res) {
    try {
        await usersService.updateUser(req.body);
        res.status(201).json('Updating was successful');
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
        const user = await usersService.getUserBySubscriberNameAndSubscriberNum(req.body.name, encrypt(req.body.subscriberNum));
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateUserDept(req, res) {
    try {
        await usersService.updateUserDept(req.params.id, req.body.amount)
        res.status(200).json("user's dept was updated successfully");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function sendEmail(req, res) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: req.body.recipient,
        subject: req.body.subject,
        text: req.body.message,
    };



    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        res.json('Email was sent successfully')
    } catch (e) {
        res.status(500).json({ error: 'Failed to send email' })
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
    updateUserDept,
    authenticateUser,
    sendEmail
};

export default UsersController;
