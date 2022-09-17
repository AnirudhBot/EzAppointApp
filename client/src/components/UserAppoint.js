import React, { useState } from "react";
import "./appoint.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function UserAppoint() {
  const location = useLocation();
  const [queueL, setQueueL] = useState();
  const [min, setMin] = useState("00");
  const [sec, setSec] = useState("00");
  let minCounter;
  let secCounter;

  const startTimer = () => {
    secCounter--;
    if (secCounter < 0) {
      if (minCounter === 0) {
        return;
      }
      minCounter--;
      secCounter = 59;
      setMin(minCounter);
      setSec(secCounter);
    } else setSec(secCounter);
  };

  const bookingHandler = (e) => {
    const clinicName = location.state.clinicName;
    const user = {
      name: location.state.userName,
      contact: location.state.userContact,
    };

    axios
      .post("http://localhost:3001/updateQueue", {
        clinicName,
        user,
      })
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("http://localhost:3001/getQueue", {
        clinicName,
      })
      .then((response) => {
        setQueueL(response.data);
        if (response.data !== 0) {
          setMin(response.data * 5 - 1);
          setSec(59);
          minCounter = response.data * 5 - 1;
          secCounter = 59;
          setInterval(startTimer, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    e.target.textContent = "Appointment Booked!";
    e.target.style.backgroundColor = "green";
  };

  return (
    <div className="Main">
      <div className="container">
        <h1 id="head" className="text-center">
          Welcome {location.state.userName}
        </h1>
        <div className="row">
          <div className="col-lg-6">
            <h2 className="text-center">{location.state.clinicName}</h2>
            <div className="row">
              <div className="col-12">
                <h3>Address:</h3>
                <p id="">{location.state.clinicAddress}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 text-center Box d-flex flex-column align-items-center justify-content-sm-around">
            <button
              className="btn btn-primary btn-lg mb-4"
              onClick={bookingHandler}
            >
              Book Your Appointment
            </button>

            <h3>
              Estimated queue time left : &nbsp; {min} :: {sec}
            </h3>

            <div className="row Stat">
              <div className="tot-tok col-12 text-center">
                <i className="fa fa-group"></i>
                <span>Your turn after : &nbsp; {queueL} &nbsp; patients</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
