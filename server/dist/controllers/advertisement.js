"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../utils/db");
const logger_1 = require("../utils/logger");
const advertisementRouter = (0, express_1.Router)();
// Get all advertisements
advertisementRouter.get('/', async (req, res) => {
    const sql = 'SELECT * FROM advertisement';
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
// Create a new advertisement
advertisementRouter.post('/', async (req, res) => {
    const { productionId } = req.params;
    const sql = 'INSERT INTO advertisement(ProductionId) VALUES(?) ';
    db_1.DB.run(sql, [productionId], function (err) {
        if (err) {
            (0, logger_1.error)(err.message);
            res.status(500).send('Failed to insert advertisement');
        }
        else {
            res.status(201).send({ id: this.lastID });
        }
    });
});
exports.default = advertisementRouter;
