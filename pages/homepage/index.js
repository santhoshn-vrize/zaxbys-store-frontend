import React, { useState, useEffect } from 'react';
import styles from './homepage.module.css';
// import Image from 'next/image';
import Video from '../Video/index';
import { useRouter } from 'next/router';
import HomePageHeader from '../HompageHeader/index';
import Spinner from 'react-bootstrap/Spinner';
import Announcement from '../Announcments';

const MenuCards = () => {
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_TOKEN;
    const apiUrl = process.env.NEXT_PUBLIC_HOMEPAGE_MENU;

    fetch(`${apiUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // console.log('Menu Data:', data.data);
        setMenuData(data.data);
        setIsLoading(false);
      })
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <div className="error-message">An error occurred: {error}</div>;
  }

  const handleCategoryClick = (menuCategoryName) => {
    router.push('/menu');
  };

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div>
     
      <HomePageHeader />
      <Video />
      <div className={`${styles.cardContainerCenter} ${styles.whiteBackground}` }>
      <section className=" pt-5 pb-9 shadow-sm">
  <div className="container">
    
    <div className={`${styles.cardContainerCenter} ${styles.whiteBackground}` }>
    <div className="row">
    {menuData.map((menuCategory) => (
        <div className="col-lg-4 mb-3 d-flex align-items-stretch">
        <div className="card ">        
                  <img className={`${styles.HomePageCardImage}`}
                    src={menuCategory.attributes.CategoruImage}  
                    alt={`${menuCategory.attributes.MenuCategoryName} Image`}                   
                  />
                  <a onClick={() => handleCategoryClick(menuCategory.attributes.MenuCategoryName)}
                  className={styles.link}>
                  <div className={`${styles.smallFont} ${styles.menuTitle}`}>
               <h3 >{menuCategory.attributes.MenuCategoryName}</h3>
               </div>
               </a>
        </div>
      </div>
    
     ))}
       
         
      </div>
    </div>
   
  </div>
</section>
<Announcement/>
      </div>

     
        </div> 
        
       
   
  );
};

export default MenuCards;
