

import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { signup } from "../actions/auth";

import * as TiIcons from "react-icons/ti";
import * as FaIcons from "react-icons/fa";

const Register = ({ signup, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    re_password: "",
  });

  const [accountCreated, setAccountCreated] = useState(false);

  const {
    username,
    first_name,
    last_name,
    phone,
    address,
    email,
    password,
    re_password,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === re_password) {
      signup({
        username,
        first_name,
        last_name,
        phone,
        address,
        email,
        password,
        re_password,
      });
      setAccountCreated(true);
    }
  };

  if (isAuthenticated) return <Redirect to="/" />;
  if (accountCreated) return <Redirect to="login" />;

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
                <span>Register</span>
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
                <h5>Register </h5>
                <div class="row">
                  <div class="col-lg-12">
                    <div class="checkout__form__input">
                      <p>
                        Username <span>*</span>
                      </p>
                      <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>

                    <div class="checkout__form__input">
                      <p>
                        FirstName <span>*</span>
                      </p>
                      <input
                        className="form-control"
                        type="text"
                        name="first_name"
                        value={first_name}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>

                    <div class="checkout__form__input">
                      <p>
                        Lastname <span>*</span>
                      </p>
                      <input
                        className="form-control"
                        type="text"
                        name="last_name"
                        value={last_name}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>

                    <div class="checkout__form__input">
                      <p>
                        Phone <span>*</span>
                      </p>
                      <input
                        className="form-control"
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>

                    <div class="checkout__form__input">
                      <p>
                        Address <span>*</span>
                      </p>
                      <input
                        className="form-control"
                        type="text"
                        name="address"
                        value={address}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>

                    <div class="checkout__form__input">
                      <p>
                        Email <span>*</span>
                      </p>
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>

                    <div class="checkout__form__input">
                      <p>
                        Account Password <span>*</span>
                      </p>
                      <input
                        className="form-control"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => onChange(e)}                      
                        required
                      />
                    </div>
                    <div class="checkout__form__input">
                      <p>
                        Confirm Password<span>*</span>
                      </p>
                      <input
                        className="form-control"
                        type="password"
                        name="re_password"
                        value={re_password}
                        onChange={(e) => onChange(e)}                        
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" class="site-btn btn_login">
                    Register
                  </button>
                </div>
                <p className="mt-3">
                  Already have an account? <Link to="/login">Sign In</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

// export default Register
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(Register);
