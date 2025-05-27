
const express = require('express');

const lendsService = require('../service/LendsService');
const pool = require('../../DB/database');
const router = express.Router()

async function getLends(req, res) {
    try {
        const lends = await lendsService.getAllLends(req.query);
        res.json(lends);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createLend(req, res) {
    try {
        const newLend = await lendsService.addLend(req.body);
        res.status(201).json(newLend);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateLend(req, res) {
    try {
        const updated = await lendsService.updateLend(req.body);
        res.status(201).json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function removeLend(req, res) {
    try {
        const deleted = await lendsService.deleteLend(req.params.id);
        res.json(deleted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getLends,
    createLend,
    updateLend,
    removeLend
};
