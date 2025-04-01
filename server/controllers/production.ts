import { Router, Request, Response } from 'express';
import { DB } from '../utils/db';
import { error } from '../utils/logger';

const productionRouter = Router();


// Get all productions
productionRouter.get('/', async (req: Request, res: Response) => {
  const sql = 'SELECT * FROM production';
  DB.all(sql, [], (err, rows) => {
    if (err) {
      error(err.message);
      res.status(500).send('Failed to execute query');
    } else {
      res.send(rows);
    }
  });
});

// Get all produced
productionRouter.get('/produced', async (req: Request, res: Response) => {
  const sql = 'SELECT * FROM Produced';
  DB.all(sql, [], (err, rows) => {
    if (err) {
      error(err.message);
      res.status(500).send('Failed to execute query');
    } else {
      res.send(rows);
    }
  });
});

// Get all roles
productionRouter.get('/roles', async (req: Request, res: Response) => {
  const sql = 'SELECT * FROM Role';
  DB.all(sql, [], (err, rows) => {
    if (err) {
      error(err.message);
      res.status(500).send('Failed to execute query');
    } else {
      res.send(rows);
    }
  });
});

export default productionRouter;
