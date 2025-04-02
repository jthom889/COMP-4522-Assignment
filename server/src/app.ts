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
import expenseRouter from '../controllers/expenses';
import playRouter from '../controllers/play';
import seatRouter from '../controllers/seat';
import ticketRouter from '../controllers/ticket';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/members', memberRouter);
app.use('/api/advertisements', advertisementRouter);
app.use('/api/advertisers', advertiserRouter);
app.use('/api/meeting', meetingRouter);
app.use('/api/income', incomeRouter);
app.use('/api/patron', patronRouter);
app.use('/api/production', productionRouter);
app.use('/api/sponsor', sponsorRouter);
app.use('/api/expenses', expenseRouter);
app.use('/api/play', playRouter);
app.use('/api/seat', seatRouter);
app.use('/api/ticket', ticketRouter);


export default app;
