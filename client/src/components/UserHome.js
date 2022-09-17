import React, { useState, useEffect } from "react";
import "./UserHome.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

export default function UserHome() {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios
      .get("http://localhost:3001/fetchClinics")
      .then((response) => {
        setResults(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  
  const userName = location.state.name;
  const userContact = location.state.contact;

  const handleChange = (event) => {
    const name = event.target.parentNode.getAttribute("name");
    const address = event.target.parentNode.getAttribute("address");
    navigate("/userAppoint", {
      state: {
        clinicName: name,
        clinicAddress: address,
        userName,
        userContact
      },
    });
  };

  return (
    <>
      {/* <div id="main">
          <div className="searchCont" id="searchbox">
            <h2 id="h2">Search your nearest Clinics:</h2>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Enter your Location"
              aria-label="Search"
              id="search"
              autoComplete="OFF"
            />
            <button className="btn btn-info my-3" type="submit" id="btn">
              Search
            </button>
          </div>
        </div>
        <div className="contain">
          <span className="item">Dentist</span>
          <span className="item">Eye</span>
          <span className="item">Psychiatrist</span>
          <span className="item">Dermatologist</span>
          <span className="item">Gynaecologist</span>
          <span className="item">General surgeon</span>
        </div> */}

      <div className="container wrapper-div">
        <div className="clinic-results row justify-content-around">
          {results.map((result, index) => {
            return (
              <div className="result col-5 row" key={index}>
                <div className="col-8">
                  <h3>{result.nameOfClinic}</h3>
                  <h4>{result.address}</h4>
                </div>
                <div className="col-4 arrow-btn">
                  <button
                    name={`${result.nameOfClinic}`}
                    address={`${result.address}`}
                    onClick={handleChange}
                  >
                    <img src="https://img.icons8.com/ios-filled/50/000000/arrow.png" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
