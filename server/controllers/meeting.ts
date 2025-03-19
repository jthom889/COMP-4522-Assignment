import { Router, Request, Response } from 'express';
import { DB } from '../utils/db';
import { error } from '../utils/logger';

const meetingRouter = Router();

// Get all meetings
meetingRouter.get('/', async (req: Request, res: Response) => {
  const sql = 'SELECT * FROM meeting';
  DB.all(sql, [], (err, rows) => {
    if (err) {
      error(err.message);
      res.status(500).send('Failed to execute query');
    } else {
      res.send(rows);
    }
  });
});

// Create a new meeting
meetingRouter.post('/', async (req: Request, res: Response) => {
  const { type, date, location } = req.params;
  const sql = 'INSERT INTO meeting(Type, Date, Location) VALUES(?, ?, ?)';
  DB.run(sql, [type, date, location], function (err) {
    if (err) {
      error(err.message);
      res.status(500).send('Failed to insert advertisement');
    } else {
      res.status(201).send({ id: this.lastID });
    }
  });
});

export default meetingRouter;
