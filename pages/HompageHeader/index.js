import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import styles from './homepage.module.css'
function BasicExample() {
  const [headerData, setHeaderData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_HOMEPAGE_Header;
    const authToken = process.env.NEXT_PUBLIC_TOKEN;

 
    const fetchHeaderData = async () => {
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

       
        if (responseData.data && responseData.data.length > 0) {
          setHeaderData(responseData.data);
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching header data:', error);
      }
    };

    fetchHeaderData();
  }, []);

  return (
   
    <Navbar expand="lg" className={`bg-body-tertiary ${styles.HomePageNavBar}`} fixed="top">
      
    <Container>
   
      <div className="d-flex justify-content-between align-items-center w-100">
      <div className="d-flex align-items-center">
         <img src='https://res.cloudinary.com/dlyas2oxp/image/upload/v1694077483/logo_main_89b07b5c_2bac9521bf.svg' alt='Zaxbys Logo' className={`${styles.Logo} m-0`}></img>
        </div>
        <div className={`text-center flex-grow-1 ${styles['custom-container']}`}>
       
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {headerData.map((item,index) => (
                <Nav.Link key={item.id} href="#" className={`me-${index + 1}`}>
                  <p className={`${styles.smallFont} ${styles.menuTitle}`}>{item.attributes.HeaderName}</p>
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </div>
      </div>
    </Container>
  </Navbar>
  

  );
}

export default BasicExample;
