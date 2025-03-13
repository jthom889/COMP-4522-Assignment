"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const config = {
    PORT: process.env.PORT || 3000,
};
exports.default = config;
