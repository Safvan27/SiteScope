
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Upload photos
router.post('/upload', authenticateToken, upload.array('photos', 10), async (req, res) => {
  try {
    const { project_id, task_id, category, description } = req.body;
    const uploadedPhotos = [];

    for (const file of req.files) {
      const result = await pool.query(
        'INSERT INTO photos (project_id, task_id, uploaded_by, filename, original_name, file_path, file_size, category, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [project_id, task_id, req.user.id, file.filename, file.originalname, file.path, file.size, category, description]
      );
      
      uploadedPhotos.push(result.rows[0]);
    }

    res.status(201).json({
      message: 'Photos uploaded successfully',
      photos: uploadedPhotos
    });
  } catch (error) {
    console.error('Error uploading photos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get photos for a project
router.get('/project/:projectId', authenticateToken, async (req, res) => {
  try {
    const { projectId } = req.params;
    
    const result = await pool.query(`
      SELECT p.*, u.name as uploaded_by_name
      FROM photos p
      LEFT JOIN users u ON p.uploaded_by = u.id
      WHERE p.project_id = $1
      ORDER BY p.created_at DESC
    `, [projectId]);

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all photos (with filters)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { category, project_id } = req.query;
    let query = `
      SELECT p.*, u.name as uploaded_by_name, pr.name as project_name
      FROM photos p
      LEFT JOIN users u ON p.uploaded_by = u.id
      LEFT JOIN projects pr ON p.project_id = pr.id
      WHERE 1=1
    `;
    const queryParams = [];

    if (category) {
      query += ' AND p.category = $' + (queryParams.length + 1);
      queryParams.push(category);
    }

    if (project_id) {
      query += ' AND p.project_id = $' + (queryParams.length + 1);
      queryParams.push(project_id);
    }

    query += ' ORDER BY p.created_at DESC';

    const result = await pool.query(query, queryParams);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching photos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete photo
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get photo info first
    const photoResult = await pool.query('SELECT * FROM photos WHERE id = $1', [id]);
    
    if (photoResult.rows.length === 0) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    const photo = photoResult.rows[0];

    // Check permissions
    if (req.user.role !== 'admin' && photo.uploaded_by !== req.user.id) {
      return res.status(403).json({ error: 'Permission denied' });
    }

    // Delete file from filesystem
    if (fs.existsSync(photo.file_path)) {
      fs.unlinkSync(photo.file_path);
    }

    // Delete from database
    await pool.query('DELETE FROM photos WHERE id = $1', [id]);

    res.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
