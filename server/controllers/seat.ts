import { Router, Request, Response } from 'express';
import { DB } from '../utils/db';
import { error } from '../utils/logger';

const seatRouter = Router();

// Get all seats
seatRouter.get('/', async (req: Request, res: Response) => {
  const sql = 'SELECT * FROM seat';
  DB.all(sql, [], (err, rows) => {
    if (err) {
      error(err.message);
      res.status(500).send('Failed to execute query');
    } else {
      res.send(rows);
    }
  });
});

seatRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { Venue, Row, Number, Occupied } = req.body;

  const sql = `UPDATE Seat SET Venue = ?, Row = ?, Number = ?, Occupied = ? WHERE SeatID = ?`;

  DB.run(sql, [Venue, Row, Number, Occupied, id], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Failed to update member');
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json({ message: 'Member updated successfully' });
  });
});

export default seatRouter;
