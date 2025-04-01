"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../utils/db");
const logger_1 = require("../utils/logger");
const playRouter = (0, express_1.Router)();
// Get all plays
playRouter.get('/', async (req, res) => {
    const sql = 'SELECT * FROM Play';
    db_1.DB.all(sql, [], (err, rows) => {
        if (err) {
            (0, logger_1.error)(err.message);
            res.status(500).send('Failed to execute query');
        }
        else {
            res.send(rows);
        }
    });
});
// Add a new play
playRouter.post('/', async (req, res) => {
    try {
        const { PlayID, Title, Author, Genre, NumberOfActs } = req.body;
        const sql = 'INSERT INTO Play (PlayID, Title, Author, Genre, NumberOfActs) VALUES (?, ?, ?, ?, ?)';
        db_1.DB.run(sql, [PlayID, Title, Author, Genre, NumberOfActs], function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Failed to add play');
            }
            res.status(201).json({ message: 'Play added successfully', playId: this.lastID });
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
// Update a play by ID
playRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Title, Author, Genre, NumberOfActs } = req.body;
        const sql = 'UPDATE Play SET Title = ?, Author = ?, Genre = ?, NumberOfActs = ? WHERE PlayID = ?';
        db_1.DB.run(sql, [Title, Author, Genre, NumberOfActs, id], function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Failed to update play');
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Play not found' });
            }
            res.json({ message: 'Play updated successfully' });
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
// Delete a play by ID
playRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'DELETE FROM Play WHERE PlayID = ?';
        db_1.DB.run(sql, [id], function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Failed to delete play');
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Play not found' });
            }
            res.json({ message: 'Play deleted successfully' });
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
exports.default = playRouter;
