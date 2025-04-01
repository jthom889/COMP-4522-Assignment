import { Router, Request, Response } from 'express';
import { DB } from '../utils/db';
import { error } from '../utils/logger';

const playRouter = Router();


// Get all plays
playRouter.get('/', async (req: Request, res: Response) => {
  const sql = 'SELECT * FROM Play';
  DB.all(sql, [], (err, rows) => {
    if (err) {
      error(err.message);
      res.status(500).send('Failed to execute query');
    } else {
      res.send(rows);
    }
  });
});

// Add a new play
playRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { PlayID, Title, Author, Genre, NumberOfActs } = req.body;

    const sql = 'INSERT INTO Play (PlayID, Title, Author, Genre, NumberOfActs) VALUES (?, ?, ?, ?, ?)';
    DB.run(sql, [PlayID, Title, Author, Genre, NumberOfActs], function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Failed to add play');
      }
      res.status(201).json({ message: 'Play added successfully', playId: this.lastID });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Update a play by ID
playRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { Title, Author, Genre, NumberOfActs } = req.body;

    const sql = 'UPDATE Play SET Title = ?, Author = ?, Genre = ?, NumberOfActs = ? WHERE PlayID = ?';
    DB.run(sql, [Title, Author, Genre, NumberOfActs, id], function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Failed to update play');
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Play not found' });
      }
      res.json({ message: 'Play updated successfully' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Delete a play by ID
playRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const sql = 'DELETE FROM Play WHERE PlayID = ?';
    DB.run(sql, [id], function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Failed to delete play');
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Play not found' });
      }
      res.json({ message: 'Play deleted successfully' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default playRouter;
