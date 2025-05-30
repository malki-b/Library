import lendsService from '../service/lendService.js';

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

async function deleteLend(req, res) {
    try {
        const deleted = await lendsService.deleteLend(req.params.id);
        res.json(deleted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const lendsController = {
    getLends,
    createLend,
    updateLend,
    deleteLend
};

export default lendsController