import React from "react";
import './HomepageOffers.module.css'; // Import your CSS file

export default function App() {
  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <p className="text-tiny uppercase font-bold">Daily Mix</p>
          <small className="text-default-500">12 Tracks</small>
          <h4 className="font-bold text-large">Frontend Radio</h4>
        </div>
        <div className="card-body">
          <div className="image-container">
            <img
              alt="Card background 1"
              className="image"
              src="https://res.cloudinary.com/dlyas2oxp/image/upload/v1694094086/large_Zaxbys_P2_App_Banner_Tile_Download_APP_1280x1760_e97eee24c5_27a0acb622.jpg"
            height="200px" width="200px"/>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <p className="text-tiny uppercase font-bold">Another Mix</p>
          <small className="text-default-500">10 Tracks</small>
          <h4 className="font-bold text-large">Backend Radio</h4>
        </div>
        <div className="card-body">
          <div className="image-container">
            <img
              alt="Card background 2"
              className="image"
              src="https://res.cloudinary.com/dlyas2oxp/image/upload/v1694094086/large_Zaxbys_P2_Peach_Tea_Banner_tile_app_1280x1760_c8798fd147_1_0248a16ee3.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
