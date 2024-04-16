import React, { useEffect, useState } from "react";
import "./appoint.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function UserAppoint() {
  const location = useLocation();
  const clinicName = location.state.clinicName;
  const name = location.state.userName;
  const contact = location.state.userContact;
  const [queueL, setQueueL] = useState(0);
  const [min, setMin] = useState("00");
  const [sec, setSec] = useState("00");
  const [bookStatus, setBookStatus] = useState(false);

  useEffect(() => {
    getQueue();
    getQueueLength();
  }, []);

  const getQueue = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/clinicQueue`, {
        clinicName,
      })
      .then((response) => {
        console.log("response of queue:", response.data);
        const isUserBooked = response.data.some(
          (obj) => obj.currUserName === name
        );
        console.log("isUserBooked:", isUserBooked);
        setBookStatus(isUserBooked);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  const getQueueLength = () => {
    console.log("queue accessed");
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/getQueue`, {
        clinicName,
        name,
        contact,
      })
      .then((response) => {
        console.log("response:", response.data);
        setQueueL(response.data);
        if (response.data !== 0) {
          const totalTimeInSeconds = response.data * 5 * 60;
          const startTime = Date.now();
          const endTime = startTime + totalTimeInSeconds * 1000;

          const updateTimer = () => {
            const remainingTime = Math.max(0, endTime - Date.now());
            const minutes = Math.floor(remainingTime / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            // Update state only if there's a change
            if (minutes !== min || seconds !== sec) {
              setMin(minutes);
              setSec(seconds);
            }

            if (remainingTime <= 0) {
              clearInterval(myInterval); // Stop the timer when time's up
            }
          };

          // Update the timer immediately and then every second
          updateTimer();
          const myInterval = setInterval(updateTimer, 1000);

          return () => clearInterval(myInterval);
        }
      });
  };

  const bookingHandler = (e) => {
    const user = {
      name,
      contact,
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/updateQueue`, {
        clinicName,
        user,
      })
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });

    setBookStatus(true);
  };

  return (
    <div className="Main">
      <div className="app-container">
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
              className={`btn ${
                queueL === 0 || bookStatus ? "btn-success" : "btn-primary"
              } btn-lg mb-4`}
              onClick={bookingHandler}
              disabled={queueL === 0 || bookStatus}
            >
              {queueL === 0 || bookStatus
                ? "Appointment Booked!"
                : "Book Your Appointment"}
            </button>

            <h3>
              Estimated queue time left : &nbsp; {min} : {sec}
            </h3>

            <div className="row Stat">
              <div className="tot-tok col-12 text-center">
                <i className="fa fa-group"> </i>
                {queueL === 0 ? (
                  " It's your turn now"
                ) : (
                  <span>
                    {" "}
                    Your turn after : &nbsp; {queueL} &nbsp; patients
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
