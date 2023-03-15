import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Registration = () => {
    
 const navigate = useNavigate();
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");



 const saveAdmin = async (e) => {
    e.preventDefault();
    try {
        await axios.post("http://localhost:5001/admin", {
          name,
          email,
          password,
        });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
  };


  return (
    <>
      <div className="hero is-fullheight">
        <div className="hero-body is-justify-content-center is-align-items-center">
          <div className="columns is-flex is-flex-direction-column box">
          <form onSubmit={saveAdmin}>
            <div className="column">
              <label for="name">Name</label>
              <input
                className="input is-primary"
                type="text"
                placeholder="Enter Name"
                value={name} 
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="column">
              <label for="email">Email</label>
              <input
                className="input is-primary"
                type="text"
                placeholder="Email address"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="column">
              <label for="Name">Password</label>
              <input
                className="input is-primary"
                type="password"
                placeholder="Password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
              <input type="checkbox" />I agree to the terms and conditions
              <label></label>
            </div>
            <div className="column">
              <button className="button is-primary is-fullwidth" type="submit">
                Create an account
              </button>
            </div>
            <div className="has-text-centered">
              <Link to="/">
                <p> Already have an account? Login</p>
              </Link>
            </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
