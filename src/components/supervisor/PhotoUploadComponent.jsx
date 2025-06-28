
import React, { useState } from 'react';

const PhotoUploadComponent = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('progress');

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      
      // Simulate upload progress
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
      
      // Simulate file upload with progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
      }
    }

    // Reset form after upload
    setTimeout(() => {
      setSelectedFiles([]);
      setUploadProgress({});
      setDescription('');
      alert('Photos uploaded successfully!');
    }, 1000);
  };

  const removeFile = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
  };

  return (
    <div className="photo-upload-container">
      <div className="upload-form">
        <h3>Upload Construction Photos</h3>
        
        <div className="form-group">
          <label>Photo Category:</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            <option value="progress">Progress Update</option>
            <option value="quality">Quality Check</option>
            <option value="safety">Safety Inspection</option>
            <option value="materials">Materials</option>
            <option value="equipment">Equipment</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what these photos show..."
            className="description-textarea"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Select Photos:</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="file-input"
          />
        </div>

        {selectedFiles.length > 0 && (
          <div className="selected-files">
            <h4>Selected Files:</h4>
            {selectedFiles.map((file, index) => (
              <div key={index} className="file-item">
                <div className="file-info">
                  <span>{file.name}</span>
                  <span className="file-size">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                </div>
                <div className="file-actions">
                  {uploadProgress[file.name] !== undefined && (
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${uploadProgress[file.name]}%` }}
                      ></div>
                      <span className="progress-text">{uploadProgress[file.name]}%</span>
                    </div>
                  )}
                  <button 
                    onClick={() => removeFile(index)}
                    className="remove-btn"
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button 
          onClick={handleUpload}
          disabled={selectedFiles.length === 0}
          className="upload-btn"
        >
          Upload Photos
        </button>
      </div>
    </div>
  );
};

export default PhotoUploadComponent;
