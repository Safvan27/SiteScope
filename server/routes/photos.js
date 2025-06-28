
const express = require('express');
const multer = require('multer');
const path = require('path');
const supabase = require('../config/database');
const auth = require('../middleware/auth');

const router = express.Router();

// Configure multer for memory storage (since we're uploading to Supabase)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Upload photos
router.post('/upload', auth, upload.array('photos', 10), async (req, res) => {
  try {
    const { projectId, taskId, category, description } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadedPhotos = [];

    for (const file of files) {
      // Generate unique filename
      const fileExt = path.extname(file.originalname);
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}${fileExt}`;
      const filePath = `photos/${projectId}/${fileName}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('construction-photos')
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          duplex: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        continue;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('construction-photos')
        .getPublicUrl(filePath);

      // Save photo record to database
      const { data: photoData, error: dbError } = await supabase
        .from('photos')
        .insert([{
          project_id: projectId,
          task_id: taskId || null,
          uploaded_by: req.user.userId,
          filename: fileName,
          original_name: file.originalname,
          file_path: urlData.publicUrl,
          file_size: file.size,
          category: category || 'progress',
          description: description || ''
        }])
        .select()
        .single();

      if (!dbError) {
        uploadedPhotos.push(photoData);
      }
    }

    res.json({
      message: `${uploadedPhotos.length} photos uploaded successfully`,
      photos: uploadedPhotos
    });

  } catch (error) {
    console.error('Photo upload error:', error);
    res.status(500).json({ error: 'Failed to upload photos' });
  }
});

// Get photos for a project
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const { projectId } = req.params;
    const { category, limit = 50, offset = 0 } = req.query;

    let query = supabase
      .from('photos')
      .select(`
        *,
        uploaded_by_user:users!uploaded_by(name),
        project:projects(name),
        task:tasks(name)
      `)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })
      .range(offset, offset + parseInt(limit) - 1);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch photos' });
    }

    res.json(data);

  } catch (error) {
    console.error('Get photos error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all photos with filters
router.get('/', auth, async (req, res) => {
  try {
    const { category, projectId, limit = 50, offset = 0 } = req.query;

    let query = supabase
      .from('photos')
      .select(`
        *,
        uploaded_by_user:users!uploaded_by(name),
        project:projects(name),
        task:tasks(name)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + parseInt(limit) - 1);

    if (category) {
      query = query.eq('category', category);
    }

    if (projectId) {
      query = query.eq('project_id', projectId);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch photos' });
    }

    res.json(data);

  } catch (error) {
    console.error('Get photos error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete photo
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Get photo details first
    const { data: photo, error: fetchError } = await supabase
      .from('photos')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    // Extract file path from URL for storage deletion
    const url = new URL(photo.file_path);
    const pathParts = url.pathname.split('/');
    const filePath = pathParts.slice(-2).join('/'); // Get last two parts (folder/filename)

    // Delete from Supabase Storage
    const { error: storageError } = await supabase.storage
      .from('construction-photos')
      .remove([filePath]);

    if (storageError) {
      console.error('Storage deletion error:', storageError);
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('photos')
      .delete()
      .eq('id', id);

    if (dbError) {
      return res.status(500).json({ error: 'Failed to delete photo record' });
    }

    res.json({ message: 'Photo deleted successfully' });

  } catch (error) {
    console.error('Delete photo error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
