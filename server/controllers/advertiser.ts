import { Router, Request, Response } from 'express';
import { DB } from '../utils/db';
import { error } from '../utils/logger';

const advertiserRouter = Router();


// Get all advertiser
advertiserRouter.get('/', async (req: Request, res: Response) => {
  const sql = 'SELECT * FROM advertiser';
  DB.all(sql, [], (err, rows) => {
    if (err) {
      error(err.message);
      res.status(500).send('Failed to execute query');
    } else {
      res.send(rows);
    }
  });
});

// Get all Advertiser Contributions
advertiserRouter.get('/contributions', async (req: Request, res: Response) => {
  const sql = 'SELECT * FROM AdvertiserContributions';
  DB.all(sql, [], (err, rows) => {
    if (err) {
      error(err.message);
      res.status(500).send('Failed to execute query');
    } else {
      res.send(rows);
    }
  });
});


// Create a new advertiser
advertiserRouter.post('/', async (req: Request, res: Response) => {
  const { advertisementName, contact, email, phone } = req.params;
  const sql = 'INSERT INTO advertiser(AdvertisementName, Contact, Email, Phone) VALUES(?, ?, ?, ?) ';
  DB.run(sql, [advertisementName, contact, email, phone], function (err) {
    if (err) {
      error(err.message);
      res.status(500).send('Failed to insert advertiser');
    } else {
      res.status(201).send({ id: this.lastID });
    }
  });
});

export default advertiserRouter;
