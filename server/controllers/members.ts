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

// Get all active members
memberRouter.get('/active', async (req: Request, res: Response) => {
  const sql = 'SELECT * from ActiveMembers';
  DB.all(sql, [], (err, rows) => {
    if (err) {
      error(err.message);
      res.status(500).send('Failed to execute query');
    } else {
      res.send(rows);
    }
  })
})

// Get all Member Roles
memberRouter.get('/roles', async (req: Request, res: Response) => {
  const sql = 'SELECT * from MemberRoles';
  DB.all(sql, [], (err, rows) => {
    if (err) {
      error(err.message);
      res.status(500).send('Failed to execute query');
    } else {
      res.send(rows);
    }
  })
})

// Get all Member Dues
memberRouter.get('/roles', async (req: Request, res: Response) => {
  const sql = 'SELECT * from MemberDues';
  DB.all(sql, [], (err, rows) => {
    if (err) {
      error(err.message);
      res.status(500).send('Failed to execute query');
    } else {
      res.send(rows);
    }
  })
})

// Get all member role
memberRouter.get('/role', async (req: Request, res: Response) => {
  const sql = 'SELECT * from MemberRole';
  DB.all(sql, [], (err, rows) => {
    if (err) {
      error(err.message);
      res.status(500).send('Failed to execute query');
    } else {
      res.send(rows);
    }
  })
})

// Get all member roles
memberRouter.get('/roles', async (req: Request, res: Response) => {
  const sql = 'SELECT * from MemberRoles';
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
  try {
    console.log("Received Data:", req.body);
    const { MemberID, FirstName, LastName, Email, Phone, Address, PaidDues, JoinDate, ActivityStatus } = req.body;

    const sql = 'INSERT INTO member(MemberID, FirstName, LastName, Email, Phone, Address, PaidDues, JoinDate, ActivityStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    DB.run(sql, [MemberID, FirstName, LastName, Email, Phone, Address, PaidDues, JoinDate, ActivityStatus], function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send('Failed to insert member');
      } else {
        res.status(201).json({ id: this.lastID });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Delete a member
memberRouter.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Member WHERE MemberID = ?';

  DB.run(sql, [id], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Failed to delete member');
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json({ message: 'Member deleted successfully' });
  });
});

// Update a member
memberRouter.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { FirstName, LastName, Email, Phone, Address, PaidDues, JoinDate, ActivityStatus } = req.body;

  const sql = `UPDATE Member SET FirstName = ?, LastName = ?, Email = ?, Phone = ?, Address = ?, PaidDues = ?, JoinDate = ?, ActivityStatus = ? WHERE MemberID = ?`;

  DB.run(sql, [FirstName, LastName, Email, Phone, Address, PaidDues, JoinDate, ActivityStatus, id], function (err) {
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



export default memberRouter;
