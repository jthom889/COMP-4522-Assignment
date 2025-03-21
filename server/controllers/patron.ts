import { Router, Request, Response } from 'express';
import { DB } from '../utils/db';
import { error } from '../utils/logger';

const patronRouter = Router();


// Get all productions
patronRouter.get('/', async (req: Request, res: Response) => {
  const sql = 'SELECT * FROM sponsor';
  DB.all(sql, [], (err, rows) => {
    if (err) {
      error(err.message);
      res.status(500).send('Failed to execute query');
    } else {
      res.send(rows);
    }
  });
});

export default patronRouter;
