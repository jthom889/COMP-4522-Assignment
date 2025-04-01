"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const members_1 = __importDefault(require("../controllers/members"));
const advertisement_1 = __importDefault(require("../controllers/advertisement"));
const advertiser_1 = __importDefault(require("../controllers/advertiser"));
const meeting_1 = __importDefault(require("../controllers/meeting"));
const income_1 = __importDefault(require("../controllers/income"));
const patron_1 = __importDefault(require("../controllers/patron"));
const production_1 = __importDefault(require("../controllers/production"));
const sponsor_1 = __importDefault(require("../controllers/sponsor"));
const expenses_1 = __importDefault(require("../controllers/expenses"));
const play_1 = __importDefault(require("../controllers/play"));
const seat_1 = __importDefault(require("../controllers/seat"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/members', members_1.default);
app.use('/api/advertisements', advertisement_1.default);
app.use('/api/advertisers', advertiser_1.default);
app.use('/api/meeting', meeting_1.default);
app.use('/api/income', income_1.default);
app.use('/api/patron', patron_1.default);
app.use('/api/production', production_1.default);
app.use('/api/sponsor', sponsor_1.default);
app.use('/api/expenses', expenses_1.default);
app.use('/api/play', play_1.default);
app.use('/api/seat', seat_1.default);
exports.default = app;
