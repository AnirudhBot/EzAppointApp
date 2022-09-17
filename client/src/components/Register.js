import React, { useState } from "react";
import "./register.css";
import axios from "axios";

export default function Register() {
  const [clinicName, setClinicName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");

  const fieldOfStudyHandler = (e) => {
    setFieldOfStudy(e.target.value);
  };

  const clinicNameHandler = (e) => {
    setClinicName(e.target.value);
  };

  const doctorNameHandler = (e) => {
    setDoctorName(e.target.value);
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

  const addressHandler = (e) => {
    setAddress(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3001/registerClinic", {
        nameOfClinic: clinicName,
        doctorName,
        gender,
        email,
        contact,
        password,
        address
    })
    .then(response => {
        alert("Registered Successfully!");
    })
    .catch(err => {
        console.log(err);
    })

    setClinicName("");
    setDoctorName("");
    setGender("");
    setEmail("");
    setContact("");
    setPassword("");
    setAddress("");
    setFieldOfStudy("");
  };

  return (
    <div id="bg">
      <div className="user_reg_main">
        <div className="wrapper bg-white my-2">
          <div className="h3" style={{ color: "black" }}>
            Doctor's Registration Protal
          </div>
          <form onSubmit={submitHandler} className="form">
            <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Name</label>{" "}
                <input
                  type="text"
                  className="form-control"
                  onChange={doctorNameHandler}
                  value={doctorName}
                  required
                />
              </div>
              <div className="col-md-6 mt-md-0 mt-3">
                <label>Clinic Name</label>{" "}
                <input
                  type="text"
                  className="form-control"
                  onChange={clinicNameHandler}
                  value={clinicName}
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
            <div className="row">
              <div className="col-md-12 my-md-2 my-3">
                <label>Address</label>{" "}
                <input
                  type="Address"
                  className="form-control"
                  onChange={addressHandler}
                  value={address}
                  required
                />
              </div>
            </div>
            <div className=" my-md-2 my-3">
              <label>Field of Study</label>
              <select
                id="sub"
                onChange={fieldOfStudyHandler}
                value={fieldOfStudy}
                required
              >
                <option value="" selected hidden>
                  Choose Option
                </option>
                <option value="Healthcare">Healthcare</option>
                <option value="Dentist">Dentist</option>
                <option value="Eye">Eye</option>
                <option value="Phychiotrist">Phychiotrist</option>
                <option value="Gynaecologist">Gynaecologist</option>
              </select>{" "}
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
