import express from 'express';
import cors from 'cors';
import memberRouter from '../controllers/members';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/members', memberRouter);


export default app;
