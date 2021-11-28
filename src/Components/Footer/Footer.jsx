import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 mt-3">
            <i className="fab fa-facebook-f ms-4 me-4"></i>
            <i className="fab fa-twitter ms-4 me-4"></i>
            <i className="fab fa-instagram ms-4 me-4"></i>
          </div>
          <div className="col-lg-4 mt-3">
            <h3>Sence</h3>
          </div>
          <div className="col-lg-4 mt-3">
            <p>© 2021 Sence. All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
