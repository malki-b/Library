import lendsService from '../service/lendService.js';

async function getLends(req, res) {
    try {
        const lends = await lendsService.getAllLends(req.query);        
        const formattedLends = lends.map(lend => ({
            ...lend,
            lendDate: lend.lendDate && lend.lendDate!="null" ? formatDate(new Date(lend.lendDate)) : null,
            returnDate: lend.returnDate && lend.lendDate!="null" ? formatDate(new Date(lend.returnDate)) : null
        }));
        res.json(formattedLends);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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