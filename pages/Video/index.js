import { useState, useEffect } from 'react';
import styles from './video.module.css';

function HomePage() {
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVideoData() {
      try {
        const response = await fetch(
          'https://zaxbys-backendstore.onrender.com/api/video?populate=*',
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch video data');
        }

        const data = await response.json();
        setVideoData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching video data:', error);
        setIsLoading(false);
      }
    }

    fetchVideoData();
  }, []);

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.VideoContainer}>
          <video
            loop
            autoPlay
            muted
            style={{ width: '100%', height: '450px', objectFit: 'cover' }}
            onContextMenu={handleContextMenu}
            controls // Enable browser video controls
          >
            <source
              src="https://res.cloudinary.com/dlyas2oxp/video/upload/v1693294524/videoplayback_65b392a697.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}

export default HomePage;
