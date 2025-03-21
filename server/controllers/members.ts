import { Router, Request, Response } from 'express';
import { DB } from '../utils/db';
import { error } from '../utils/logger';

const memberRouter = Router();

// Get all members
memberRouter.get('/', async (req: Request, res: Response) => {
  const sql = 'SELECT * FROM member';
  DB.all(sql, [], (err, rows) => {
    if (err) {
      error(err.message);
      res.status(500).send('Failed to execute query');
    } else {
      res.send(rows);
    }
  });
});

// Create a new member
memberRouter.post('/', async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, address, paidDues, joinDate, activityStatus } = req.body;
  const sql = 'INSERT INTO member(FirstName, LastName, Email, Phone, Address, PaidDues, JoinDate, ActivityStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  DB.run(sql, [firstName, lastName, email, phone, address, paidDues, joinDate, activityStatus], function (err) {
    if (err) {
      error(err.message);
      res.status(500).send('Failed to insert member');
    } else {
      res.status(201).send({ id: this.lastID });
    }
  });
});


export default memberRouter;
