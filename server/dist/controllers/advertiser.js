"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../utils/db");
const logger_1 = require("../utils/logger");
const advertiserRouter = (0, express_1.Router)();
// Get all advertiser
advertiserRouter.get('/', async (req, res) => {
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
// Get all Advertiser Contributions
advertiserRouter.get('/contributions', async (req, res) => {
    const sql = 'SELECT * FROM AdvertiserContributions';
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
// Create a new advertiser
advertiserRouter.post('/', async (req, res) => {
    const { advertisementName, contact, email, phone } = req.params;
    const sql = 'INSERT INTO advertiser(AdvertisementName, Contact, Email, Phone) VALUES(?, ?, ?, ?) ';
    db_1.DB.run(sql, [advertisementName, contact, email, phone], function (err) {
        if (err) {
            (0, logger_1.error)(err.message);
            res.status(500).send('Failed to insert advertiser');
        }
        else {
            res.status(201).send({ id: this.lastID });
        }
    });
});
exports.default = advertiserRouter;
