import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/About";
import Login from "./components/Login";
import UserHome from "./components/UserHome";
import Register from "./components/Register";
import User_reg from "./components/User_reg";
import Result from "./components/Result";
import Dashboard from "./components/Dashboard";
import UserAppoint from "./components/UserAppoint";

function App() {
  const [mode, setmode] = useState("dark");
  if(mode === 'dark') {
    document.body.style.backgroundColor = "#253047";
    document.body.style.color = "white";
    
  }  
   else{
    document.body.style.backgroundColor = "white";
    document.body.style.fontColor = "black";
   }
  const toggleMode = () => {
    if (mode === "dark") {
      setmode("light");
      document.body.style.backgroundColor = "white";
      document.body.style.fontColor = "black";
    } else {
      setmode("dark");
      document.body.style.backgroundColor = "#253047";
      document.body.style.color = "white";
    }
  };

  return (
    <Router>
      <Navbar
        title="Clinic App"
        link="Register"
        mode={mode}
        togglemode={toggleMode}
        login='Login'
        m={
          mode === "light" ? (
            <img src="https://img.icons8.com/material-outlined/24/000000/do-not-disturb-2.png" />
          ) : (
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABVklEQVRIib2WTU4CQRCFgZ0RVw5E7+Ee4QIG4kE0aojRhciBJLLlCIoGFm70DMjoVj8XvCYdnJ6pnkRf0pmkeT/VlekaKpUIIMRoajHkMvgVAGyVNSvUAufAC7BfwrwBzIDrYDowV5vnQCPS3NdmnwRoijBxJO0NgSfgU2sK3LoiVNxE2mZRNYlnfgykhLEEel5IYj21M/+W0R3QAra1DoGRfvsCumZjry2u8oscXl+c99jqh65yA/de3EFMwLNELQO3Le40RFjD2/vQVt0QsCNumuUZGhUx86aap6lVPXj7b3oeGAIc53Wd6CF0grGeJ4aA0w1NMVhd/aXa2M/hXYqzAHbNARL3dInQq9gG6lodYOxdtKMYY39UdHWJQlg4cyyjguxhlwAD4FGvbwo8ADeuLViGHf80rs9YfXD2rOYbITPgqogY/Oy5xpfRmlAUkIU//1fxA+yyWHyFCsRtAAAAAElFTkSuQmCC"></img>
          )
        }
      />

      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/about" element={<About mode={mode} />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/userhome" element={<UserHome />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/reguser" element={<User_reg />}></Route>
        <Route
          exact
          path="/userAppoint"
          element={<UserAppoint mode={mode} />}
        ></Route>
        <Route exact path="/result" element={<Result mode={mode} />}></Route>
        <Route
          exact
          path="/dashboard"
          element={<Dashboard mode={mode} />}
        ></Route>
      </Routes>
      <Footer mode={mode} />
    </Router>
  );
}

export default App;
