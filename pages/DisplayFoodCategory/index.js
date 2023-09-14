import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Toast } from 'react-bootstrap';
import styles from './Category.module.css';

export default function CategoryCollection({ category }) {
  const authToken = process.env.NEXT_PUBLIC_TOKEN;
  const apiUrl = process.env.NEXT_PUBLIC_HOMEPAGE_MENU;
  const [categoryData, setCategoryData] = useState([]);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false); 
  const [showToast, setShowToast] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    // Fetch data and handle authentication
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        setCategoryData(responseData.data);
        console.log(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); 

  const handleButtonClick = (foodItem) => {
    setSelectedFoodItem(foodItem);   
    setIsOffcanvasOpen(true);   
    console.log('Selected Food Item:', foodItem);
  };

  const closeOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };

  const handleOrder = () => {   
    const orderSuccessful = false;

    if (orderSuccessful) {
      console.log('Order successful');
    } else {
      setShowToast(true);
    }
  };

  return (
    <div className="row">
      <div className="col-12">
        <nav id="navbar-example2" className="navbar bg-body-tertiary px-3 mb-3 fixed-top">
         
        <a href='/homepage'><img src="https://res.cloudinary.com/dlyas2oxp/image/upload/v1694077483/logo_main_89b07b5c_2bac9521bf.svg" alt="Zaxbys Logo" className={`${styles.Logo}  m-0`} href="/homepage"/></a>  
            
           
        
          <ul className={`nav nav-pills InnerpageNavbar`} >
            {categoryData.map((item, index) => (
              <li className="nav-item" key={item.id}>
                <a className="nav-link" href={`#scrollspyHeading${index + 1}`}>
                  <h6 className={`${styles.smallFont} ${styles.menuTitle}`}>{item.attributes.MenuCategoryName}</h6>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={`${styles.InnerPageBackground}`}>
        <div
          data-bs-spy="scroll"
          data-bs-target="#navbar-example2"
          data-bs-root-margin="0px 0px -40%"
          data-bs-smooth-scroll="true"
          className="scrollspy-example bg-body-tertiary  rounded-2"
          tabIndex="0"
        >
          {categoryData.map((item, index) => (
            <div className={`${styles.InnerPageBackground}`} key={item.id}>
              <div id={`scrollspyHeading${index + 1}`} key={item.id}>
                <div className={`${styles.InnerpageTitle}`}>
                 

                  <section className="pt-5 pb-9 shadow-sm">
                    <div className="container">
                    <p className={`${styles.InnerPageCategoryTitle}`}>
                    {item.attributes.MenuCategoryName}
                    </p>
                   
                    <div className={`${styles.cardContainerCenter} ${styles.whiteBackground}` }>
                        <div className="row">
                          {item.attributes.Food.map((foodItem) => (
                            <div className="col-lg-3 mb-5 d-flex align-items-stretch" key={foodItem.id}>
                              <div className="card col-md-12">
                                <img src={foodItem.Image} className={`${styles.HomePageCardImage}`}alt={foodItem.Title} />
                                <div className="card-body d-flex flex-column">
                                  <h4 className="card-title">{foodItem.Title}</h4>
                                  <p className="card-text">Price: {foodItem.Price}</p>
                                  <p className="card-text">Calories: {foodItem.Calories}</p>
                                  <div className={`d-flex justify-content-between align-items-center mt-auto ${styles.btnContainer}`}>
                                    <button className="btn btn-danger rounded-pill" onClick={() => handleButtonClick(foodItem)}>Choose</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  
                  </section>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    
      <div
        className={`offcanvas offcanvas-end ${isOffcanvasOpen ? 'show' : ''}`}
        tabIndex="-1"
        id="offcanvas"
        aria-labelledby="offcanvasLabel"
        style={{ width: '450px' }} 
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={closeOffcanvas}
          ></button>
        </div>
        <div className="offcanvas-body">
        
          {selectedFoodItem && (
            <div>
              <h5>{selectedFoodItem.Title}</h5>
              <img
                src={selectedFoodItem.Image} 
                alt={selectedFoodItem.Title}
                style={{ width: '100%' }} 
              />
              <p>Price: {selectedFoodItem.Price}</p>
              <p>Calories: {selectedFoodItem.Calories}</p>
              <p>Description: {selectedFoodItem.Description}</p>
             
            </div>
          )}

          <Toast
            show={showToast}
            onClose={() => setShowToast(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
            }}
          >
            <Toast.Header>
              <strong className="me-auto">Unable to Order</strong>
            </Toast.Header>
            <Toast.Body>Sorry, we are currently unable to process your order.</Toast.Body>
          </Toast>
         
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleOrder}
        >
          Order
        </button>
      </div>
    </div>
  );
}
