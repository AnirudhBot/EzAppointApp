import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [person, setPerson] = useState("");
  const navigate = useNavigate();

  const handleUserLogin = () => {
    axios
      .post("http://localhost:3001/loginUser", {
        email,
        password,
      })
      .then((response) => {
        const message = response.data.message;
        if (message === "Logged in sucessfully") {
          navigate("/userhome", {
            state: {
              name: response.data.foundUser.firstName,
              contact: response.data.foundUser.contact,
            },
          });
        } else {
          alert(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClinicLogin = () => {
    axios
      .post("http://localhost:3001/loginClinic", {
        email,
        password,
      })
      .then((response) => {
        // load the doctor home page
        const message = response.data.message;
        if (message === "Logged in successfully") {
          navigate("/dashboard", {
            state: {
              name: response.data.foundClinic.doctorName,
              clinic: response.data.foundClinic.nameOfClinic,
            },
          });
        } else {
          alert(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const personHandler = (e) => {
    setPerson(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (person === "User") {
      handleUserLogin();
    } else if (person === "Doctor") handleClinicLogin();

    setEmail("");
    setPassword("");
    setPerson("");
  };

  return (
    <>
      <section className="login py-5">
        <div className="container" style={{ padding: "38px" }}>
          <div className="row g-0">
            <div className="col-lg-5">
              <div className="image"></div>
            </div>
            <div className="col-lg-7 text-center py-2">
              <h2
                style={{
                  color: "black",
                  font: "caption",
                  fontSize: "40px",
                  fontWeight: "bold",
                }}
              >
                Login to your Account
              </h2>

              <form onSubmit={submitHandler}>
                <div className="form-row py-2 pt-2">
                  <div className="offset-1 col-lg-10">
                    <img src="https://img.icons8.com/ios-glyphs/40/000000/user--v1.png" />
                    <input
                      onChange={emailHandler}
                      value={email}
                      type="text"
                      className="inp my-3 mx-3 px-3"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="form-row pt-1">
                  <div className="offset-1 col-lg-10">
                    <img src="https://img.icons8.com/material/40/000000/lock--v1.png" />
                    <input
                      onChange={passwordHandler}
                      value={password}
                      type="password"
                      className="inp mx-3 px-3"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div
                  className="form-row d-flex justify-content-center"
                  style={{ color: "black" }}
                >
                  <div className="offset-1 col-md-4 m-2" on>
                    <label className="">You are a : </label>
                    <select
                      id="sub"
                      onChange={personHandler}
                      value={person}
                      required
                    >
                      <option value="" selected hidden>
                        Please Choose
                      </option>
                      <option value="User">User</option>
                      <option value="Doctor">Doctor</option>
                    </select>
                  </div>
                </div>
                <div className="form-row d-flex justify-content-center pt-4">
                  <div className="col-6">
                    <button className="btn1" type="submit">
                      <img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/30/000000/external-login-real-estate-kmg-design-glyph-kmg-design.png" />
                      Login
                    </button>
                    {/* <p className="float-right"><input type="checkbox">Remember Me</p> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
