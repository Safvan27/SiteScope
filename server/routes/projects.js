
const express = require('express');
const pool = require('../config/database');
const { authenticateToken, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all projects
router.get('/', authenticateToken, async (req, res) => {
  try {
    let query = `
      SELECT p.*, 
             c.name as client_name, 
             s.name as supervisor_name
      FROM projects p
      LEFT JOIN users c ON p.client_id = c.id
      LEFT JOIN users s ON p.supervisor_id = s.id
    `;

    // Filter by role
    if (req.user.role === 'client') {
      query += ' WHERE p.client_id = $1';
      const result = await pool.query(query, [req.user.id]);
      return res.json(result.rows);
    } else if (req.user.role === 'supervisor') {
      query += ' WHERE p.supervisor_id = $1';
      const result = await pool.query(query, [req.user.id]);
      return res.json(result.rows);
    }

    // Admin can see all projects
    const result = await pool.query(query + ' ORDER BY p.created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create project
router.post('/', authenticateToken, authorize(['admin']), async (req, res) => {
  try {
    const { name, description, client_id, supervisor_id, start_date, end_date, budget } = req.body;

    const result = await pool.query(
      'INSERT INTO projects (name, description, client_id, supervisor_id, start_date, end_date, budget) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, description, client_id, supervisor_id, start_date, end_date, budget]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update project progress
router.put('/:id/progress', authenticateToken, authorize(['supervisor', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const { progress } = req.body;

    const result = await pool.query(
      'UPDATE projects SET progress = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [progress, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating project progress:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
