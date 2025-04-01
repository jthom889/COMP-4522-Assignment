"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../utils/db");
const logger_1 = require("../utils/logger");
const memberRouter = (0, express_1.Router)();
// Get all members
memberRouter.get('/', async (req, res) => {
    const sql = 'SELECT * FROM member';
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
// Get all active members
memberRouter.get('/active', async (req, res) => {
    const sql = 'SELECT * from ActiveMembers';
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
// Get all Member Roles
memberRouter.get('/roles', async (req, res) => {
    const sql = 'SELECT * from MemberRoles';
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
// Get all Member Dues
memberRouter.get('/roles', async (req, res) => {
    const sql = 'SELECT * from MemberDues';
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
// Get all member role
memberRouter.get('/role', async (req, res) => {
    const sql = 'SELECT * from MemberRole';
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
// Get all member roles
memberRouter.get('/roles', async (req, res) => {
    const sql = 'SELECT * from MemberRoles';
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
// Create a new member
memberRouter.post('/', async (req, res) => {
    try {
        console.log("Received Data:", req.body);
        const { MemberID, FirstName, LastName, Email, Phone, Address, PaidDues, JoinDate, ActivityStatus } = req.body;
        const sql = 'INSERT INTO member(MemberID, FirstName, LastName, Email, Phone, Address, PaidDues, JoinDate, ActivityStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db_1.DB.run(sql, [MemberID, FirstName, LastName, Email, Phone, Address, PaidDues, JoinDate, ActivityStatus], function (err) {
            if (err) {
                console.error(err.message);
                res.status(500).send('Failed to insert member');
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
// Delete a member
memberRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Member WHERE MemberID = ?';
    db_1.DB.run(sql, [id], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Failed to delete member');
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.json({ message: 'Member deleted successfully' });
    });
});
// Update a member
memberRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { FirstName, LastName, Email, Phone, Address, PaidDues, JoinDate, ActivityStatus } = req.body;
    const sql = `UPDATE Member SET FirstName = ?, LastName = ?, Email = ?, Phone = ?, Address = ?, PaidDues = ?, JoinDate = ?, ActivityStatus = ? WHERE MemberID = ?`;
    db_1.DB.run(sql, [FirstName, LastName, Email, Phone, Address, PaidDues, JoinDate, ActivityStatus, id], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Failed to update member');
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.json({ message: 'Member updated successfully' });
    });
});
exports.default = memberRouter;
