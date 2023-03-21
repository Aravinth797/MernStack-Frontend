import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  console.log("email", email);
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  
  const saveLogin = async (e) => {
    e.preventDefault();
    if(email == "admin1@example.com" && password == "1234") {
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('password', password);
      navigate("home");
    }
    else if (email == "hari@gmail.com" && password == "1234") {
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('password', password);
      navigate("home");
    }
    else if (email == "gnanavel@gmail.com" && password == "1111") {
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('password', password);
      navigate("home");
    }
    else {
      window.confirm("Invalid User");
    }
    // try {
    //   await axios.post("http://localhost:5001/admin/signin", {
    //     email,
    //     password,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <>
      <div className="hero is-fullheight">
        <div className="hero-body is-justify-content-center is-align-items-center">
          <div className="columns is-flex is-flex-direction-column box">
            <form onSubmit={saveLogin}>
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
                <a href="forget.html">forget password?</a>
              </div>
              <div className="column">
                  <button
                    className="button is-primary is-fullwidth"
                    type="submit"
                  >
                    Login
                  </button>
              </div>
              <div className="has-text-centered">
                <Link to="register">
                  <p> Don't have an account? Sign up</p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
