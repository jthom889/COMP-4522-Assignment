import { Router, Request, Response } from 'express';
import { DB } from '../utils/db';
import { error } from '../utils/logger';

const incomeRouter = Router();


// Get all income
incomeRouter.get('/', async (req: Request, res: Response) => {
  const sql = 'SELECT * FROM income';
  DB.all(sql, [], (err, rows) => {
    if (err) {
      error(err.message);
      res.status(500).send('Failed to execute query');
    } else {
      res.send(rows);
    }
  });
});

// Get all ticket sales
incomeRouter.get('/tickets', async (req: Request, res: Response) => {
  const sql = 'SELECT * from TicketIncome';
  DB.all(sql, [], (err, rows) => {
    if (err) {
      error(err.message);
      res.status(500).send('Failed to execute query');
    } else {
      res.send(rows)
    }
  })
})

export default incomeRouter;
