"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../utils/db");
const logger_1 = require("../utils/logger");
const patronRouter = (0, express_1.Router)();
// Get all productions
patronRouter.get('/', async (req, res) => {
    const sql = 'SELECT * FROM Patron';
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
// Get all Patron Subs
patronRouter.get('/subs', async (req, res) => {
    const sql = 'SELECT * FROM PatronSub';
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
// Insert a patron
patronRouter.post('/', async (req, res) => {
    try {
        console.log("Received Data:", req.body);
        const { PatronID, FirstName, LastName, Email, PhoneNumber, Address, Subscription } = req.body;
        const sql = 'INSERT INTO patron(PatronID, FirstName, LastName, Email, PhoneNumber, Address, Subscription) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db_1.DB.run(sql, [PatronID, FirstName, LastName, Email, PhoneNumber, Address, Subscription], function (err) {
            if (err) {
                console.error(err.message);
                res.status(500).send('Failed to insert patron');
            }
            else {
                res.status(201).json({ id: this.lastID });
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
// Delete a patron
patronRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Patron WHERE PatronID = ?';
    db_1.DB.run(sql, [id], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Failed to delete patron');
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Patron not found' });
        }
        res.json({ message: 'Patron deleted successfully' });
    });
});
// Update a patron
patronRouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { FirstName, LastName, Email, PhoneNumber, Address, Subscription } = req.body;
        const sql = 'UPDATE patron SET FirstName = ?, LastName = ?, Email = ?, PhoneNumber = ?, Address = ?, Subscription = ? WHERE PatronID = ?';
        db_1.DB.run(sql, [FirstName, LastName, Email, PhoneNumber, Address, Subscription, id], function (err) {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Failed to update patron');
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Patron not found' });
            }
            res.json({ message: 'Patron updated successfully' });
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});
exports.default = patronRouter;
