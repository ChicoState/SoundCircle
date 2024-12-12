import { useState } from 'react';
import './user-album.css';

interface Album {
  id: number;
  imageUrl: string;
  description: string;
}

function AlbumWithDescription() {
  const albums: Album[] = [
    {
      id: 1,
      imageUrl: 'https://stewartstaffordblog.wordpress.com/wp-content/uploads/2018/06/a-kind-of-magic.jpg',
      description: 'I listen to this when I am drunk.',
    },
    {
      id: 2,
      imageUrl: `${process.env.REACT_APP_ALBUM_PLACEHOLDER}+2`,
      description: 'This is the second album. A masterpiece of its genre.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle navigation to the next album
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % albums.length);
  };

  // Handle navigation to the previous album
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? albums.length - 1 : prevIndex - 1
    );
  };

  const currentAlbum = albums[currentIndex];

  return (
    <div className="album-with-description">
      {/* Navigation Arrows */}
      <button onClick={handlePrev} className="nav-button prev">
        &#60;
      </button>
      <div className="album-container">
        {/* Album Image */}
        <div className="album-image">
          <img src={currentAlbum.imageUrl} alt={`Album ${currentAlbum.id}`} />
        </div>
        {/* Album Description */}
        <div className="album-description">
          <p>{currentAlbum.description}</p>
        </div>
      </div>
      <button onClick={handleNext} className="nav-button next">
        &#62;
      </button>
    </div>
  );
}

export default AlbumWithDescription;
