import { Router, Request, Response } from 'express';
import { DB } from '../utils/db';
import { error } from '../utils/logger';

const advertisementRouter = Router();

// Get all advertisements
advertisementRouter.get('/', async (req: Request, res: Response) => {
  const sql = 'SELECT * FROM advertisement';
  DB.all(sql, [], (err, rows) => {
    if (err) {
      error(err.message);
      res.status(500).send('Failed to execute query');
    } else {
      res.send(rows);
    }
  });
});

// Create a new advertisement
advertisementRouter.post('/', async (req: Request, res: Response) => {
  const { productionId } = req.params;
  const sql = 'INSERT INTO advertisement(ProductionId) VALUES(?) '
  DB.run(sql, [productionId], function (err) {
    if (err) {
      error(err.message);
      res.status(500).send('Failed to insert advertisement');
    } else {
      res.status(201).send({ id: this.lastID });
    }
  });
});

export default advertisementRouter;
