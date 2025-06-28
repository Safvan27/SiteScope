
import React from 'react';

const Gallery = () => {
  const photos = [
    {
      id: 1,
      url: 'https://via.placeholder.com/300x200/667eea/white?text=Foundation',
      title: 'Foundation Work',
      date: '2024-02-01',
      description: 'Foundation completed'
    },
    {
      id: 2,
      url: 'https://via.placeholder.com/300x200/764ba2/white?text=Structure',
      title: 'Structure Progress',
      date: '2024-03-15',
      description: 'Steel framework installation'
    },
    {
      id: 3,
      url: 'https://via.placeholder.com/300x200/667eea/white?text=Interior',
      title: 'Interior Work',
      date: '2024-04-10',
      description: 'Interior installations beginning'
    }
  ];

  return (
    <div className="gallery">
      <h1>Project Gallery</h1>
      <div className="photo-grid">
        {photos.map(photo => (
          <div key={photo.id} className="photo-item">
            <img src={photo.url} alt={photo.title} />
            <div className="photo-info">
              <h3>{photo.title}</h3>
              <p className="photo-date">{photo.date}</p>
              <p>{photo.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
