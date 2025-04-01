"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../utils/db");
const logger_1 = require("../utils/logger");
const expenseRouter = (0, express_1.Router)();
expenseRouter.get('/', async (req, res) => {
    const sql = 'SELECT * FROM advertiser';
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
exports.default = expenseRouter;
