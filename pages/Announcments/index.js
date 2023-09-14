import React, { useState, useEffect } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import './annoucment.module.css';
import styles from './annoucment.module.css';

const Announcement = () => {
  const [announcementData, setAnnouncementData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Fetch data from the specified endpoint
    fetch(process.env.NEXT_PUBLIC_HOMEPAGE_ANNOUNCEMENTS, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Assuming the data contains an array of announcements
        const announcements = data?.data || [];
        setAnnouncementData(announcements);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching announcements:', error);
        setIsLoading(false);
      });
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  return (
    <section className="bg-light pt-5 pb-5 shadow-sm">
      <div className="container">
        <div className="row pt-6">
        <div className="col-12 text-center">
        <p className={`${styles.smallFont} ${styles.menuTitle}`}>Exclusive Rewards</p>
            <p className={`${styles.smallFontJustForYou} ${styles.menuTitleJustForYou}`}>Just For You</p>
          </div>
         
        </div>
        <div className="row">
          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <>
              {announcementData.length === 0 && !isDismissed && (
                <Alert variant="info">
                  There are no announcements at the moment.
                  <button className="close" onClick={handleDismiss}>
                    <span>&times;</span>
                  </button>
                </Alert>
              )}

              {/* Render your announcements */}
              {announcementData.map((announcement, index) => (
                <div key={announcement.id} className="col-lg-4 mb-3 d-flex align-items-stretch">
                  <div className="card">
                    <img
                      src={announcement.attributes.Card}
                      alt={`Announcement ${index}`}
                      className="card-img-top" height="500px"
                    />
                  
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Announcement;
