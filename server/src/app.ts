import express from 'express';
import cors from 'cors';
import memberRouter from '../controllers/members';
import advertisementRouter from '../controllers/advertisement';
import advertiserRouter from '../controllers/advertiser';
import meetingRouter from '../controllers/meeting';
import incomeRouter from '../controllers/income';
import patronRouter from '../controllers/patron';
import productionRouter from '../controllers/production';
import sponsorRouter from '../controllers/sponsor';

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/members', memberRouter);
app.use('/api/advertisements', advertisementRouter);
app.use('/api/advertisers', advertiserRouter);
app.use('/api/meeting', meetingRouter);
app.use('/api/income', incomeRouter);
app.use('/api/patron', patronRouter);
app.use('/api/production', productionRouter);
app.use('/api/sponsor', sponsorRouter);


export default app;
