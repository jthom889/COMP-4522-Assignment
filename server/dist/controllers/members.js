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
// Create a new member
memberRouter.post('/', async (req, res) => {
    const { firstName, lastName, email, phone, address, paidDues, joinDate, activityStatus } = req.body;
    const sql = 'INSERT INTO member(FirstName, LastName, Email, Phone, Address, PaidDues, JoinDate, ActivityStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db_1.DB.run(sql, [firstName, lastName, email, phone, address, paidDues, joinDate, activityStatus], function (err) {
        if (err) {
            (0, logger_1.error)(err.message);
            res.status(500).send('Failed to insert member');
        }
        else {
            res.status(201).send({ id: this.lastID });
        }
    });
});
exports.default = memberRouter;
