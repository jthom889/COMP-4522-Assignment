"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../utils/db");
const logger_1 = require("../utils/logger");
const meetingRouter = (0, express_1.Router)();
// Get all meetings
meetingRouter.get('/', async (req, res) => {
    const sql = 'SELECT * FROM meeting';
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
// Create a new meeting
meetingRouter.post('/', async (req, res) => {
    const { type, date, location } = req.params;
    const sql = 'INSERT INTO meeting(Type, Date, Location) VALUES(?, ?, ?)';
    db_1.DB.run(sql, [type, date, location], function (err) {
        if (err) {
            (0, logger_1.error)(err.message);
            res.status(500).send('Failed to insert advertisement');
        }
        else {
            res.status(201).send({ id: this.lastID });
        }
    });
});
exports.default = meetingRouter;
