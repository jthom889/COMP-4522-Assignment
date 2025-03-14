import express from 'express';
import cors from 'cors';
import memberRouter from '../controllers/members';

const app = express();

app.use(cors());
app.use(express.json());


export default app;
