import express from 'express';
import cors from 'cors';
import memberRouter from '../controllers/members';
import advertisementRouter from '../controllers/advertisement';
import advertiserRouter from '../controllers/advertiser';
import meetingRouter from '../controllers/meeting';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/members', memberRouter);
app.use('/api/advertisements', advertisementRouter);
app.use('/api/advertisers', advertiserRouter);
app.use('/api/meeting', meetingRouter);


export default app;
