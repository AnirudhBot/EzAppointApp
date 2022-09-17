import React, { useState } from "react";
import "./register.css";
import axios from "axios";

export default function User_reg() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
  };

  const lastNameHandler = (e) => {
    setLastName(e.target.value);
  };

  const genderHandler = (e) => {
    setGender(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const contactHandler = (e) => {
    setContact(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/registerUser", {
        firstName,
        lastName,
        gender,
        email,
        password,
        contact,
      })
      .then((response) => {
        alert("Registered Successfully!");
      })
      .catch((err) => {
        console.log(err);
      });

    setFirstName("");
    setLastName("");
    setGender("");
    setEmail("");
    setContact("");
    setPassword("");
  };

  return (
    <div id="bg">
      <div className="user_reg_main">
        <div className="wrapper bg-white my-3">
          <div className="h3" style={{ color: "black" }}>
            User Registration Protal
          </div>
          <form onSubmit={submitHandler} className="form">
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>First Name</label>{" "}
                <input
                  type="text"
                  className="form-control"
                  onChange={firstNameHandler}
                  value={firstName}
                  required
                />
              </div>
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Last Name</label>{" "}
                <input
                  type="text"
                  className="form-control"
                  onChange={lastNameHandler}
                  value={lastName}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Email</label>{" "}
                <input
                  type="email"
                  className="form-control"
                  onChange={emailHandler}
                  value={email}
                  required
                />
              </div>
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Gender</label>
                <select
                  id="sub"
                  onChange={genderHandler}
                  value={gender}
                  required
                >
                  <option value="" selected hidden>
                    Choose your Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Create Password</label>{" "}
                <input
                  type="password"
                  className="form-control"
                  onChange={passwordHandler}
                  value={password}
                  required
                />
              </div>
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Phone Number</label>{" "}
                <input
                  type="tel"
                  pattern="[1-9]{1}[0-9]{9}"
                  className="form-control"
                  onChange={contactHandler}
                  value={contact}
                  required
                />
              </div>
            </div>

            <button className="btn btn-primary mt-3" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
