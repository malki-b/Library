import lendsService from '../service/lendService.js';
import booksService from '../service/booksService.js';

async function getLends(req, res) {
    try {
        const queryParams = Object.fromEntries(
            Object.entries(req.query).map(([key, value])=>
            [key, value=='null' || value== '' ? null : value])
        )
        const lends = await lendsService.getLends(queryParams);  
        const formattedLends = lends.map(lend => ({
            ...lend,
            lendDate: (lend.lendDate == null || lend.lendDate == 'null') ? null : formatDate(new Date(lend.lendDate)),
            returnDate: (lend.returnDate == null || lend.returnDate == 'null') ? null : formatDate(new Date(lend.returnDate)),

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
        const lend = req.body;
        const book = await booksService.getBook(lend.bookId)
        if (book.length == 0)
        {
            res.status(404).json({error: `book with id ${lend.bookId} does not exists`})
            return
        }
        const pendingLend = await lendsService.getLends({bookId: lend.bookId, returnDate: null})
        
        if (pendingLend.length != 0)
        {
            res.status(409).json({error: `The book ${book[0].name} with id ${lend.bookId} already lent`})
            return
        }
        await lendsService.addLend(lend);
        res.status(201).json(`Book ${book[0].id} ${book[0].name} was lent successfully`);
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