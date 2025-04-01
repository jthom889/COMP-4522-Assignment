import { Router, Request, Response } from 'express';
import { DB } from '../utils/db';
import { error } from '../utils/logger';

const patronRouter = Router();


// Get all patrons
patronRouter.get('/', async (req: Request, res: Response) => {
  const sql = 'SELECT * FROM Patron';
  DB.all(sql, [], (err, rows) => {
    if (err) {
      error(err.message);
      res.status(500).send('Failed to execute query');
    } else {
      res.send(rows);
    }
  });
});

// Get all Patron Subs
patronRouter.get('/subs', async (req: Request, res: Response) => {
  const sql = 'SELECT * FROM PatronSub';
  DB.all(sql, [], (err, rows) => {
    if (err) {
      error(err.message);
      res.status(500).send('Failed to execute query');
    } else {
      res.send(rows);
    }
  });
});

// Insert a patron
patronRouter.post('/', async (req: Request, res: Response) => {
  try {
    console.log("Received Data:", req.body);
    const { PatronID, FirstName, LastName, Email, PhoneNumber, Address, Subscription } = req.body;

    const sql = 'INSERT INTO patron(PatronID, FirstName, LastName, Email, PhoneNumber, Address, Subscription) VALUES (?, ?, ?, ?, ?, ?, ?)';

    DB.run(sql, [PatronID, FirstName, LastName, Email, PhoneNumber, Address, Subscription], function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send('Failed to insert patron');
      } else {
        res.status(201).json({ id: this.lastID });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
})

// Delete a patron
patronRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Patron WHERE PatronID = ?';

  DB.run(sql, [id], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Failed to delete patron');
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Patron not found' });
    }
    res.json({ message: 'Patron deleted successfully' });
  });
});

// Update a patron
patronRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { FirstName, LastName, Email, PhoneNumber, Address, Subscription } = req.body;

    const sql = 'UPDATE patron SET FirstName = ?, LastName = ?, Email = ?, PhoneNumber = ?, Address = ?, Subscription = ? WHERE PatronID = ?';

    DB.run(sql, [FirstName, LastName, Email, PhoneNumber, Address, Subscription, id], function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Failed to update patron');
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Patron not found' });
      }
      res.json({ message: 'Patron updated successfully' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
})



export default patronRouter;
