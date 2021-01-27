import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";

import * as TiIcons from "react-icons/ti";
import * as FaIcons from "react-icons/fa";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  };

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="login">
      <div class="breadcrumb-option">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="breadcrumb__links">
                <Link to="/">
                  <TiIcons.TiHome className="homeIcon" /> Home
                </Link>
                <FaIcons.FaAngleRight />
                <span>Login</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="checkout spad">
        <div class="container">
          <form class="checkout__form" onSubmit={(e) => onSubmit(e)}>
            <div class="row">
              <div class="col-lg-12">
                <h5>Login </h5>
                <div class="row">
                  <div class="col-lg-12">
                    <div class="checkout__form__input">
                      <p>
                        Email <span>*</span>
                      </p>
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>

                    <div class="checkout__form__input">
                      <p>
                        Password <span>*</span>
                      </p>
                      <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => onChange(e)}                        
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" class="site-btn btn_login">
                    Login
                  </button>
                </div>
                <p className="mt-3">
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
                <p className="mt-3">
                  Forgot your Password?{" "}
                  <Link to="/reset_password">Reset Password</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

// export default Login

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
