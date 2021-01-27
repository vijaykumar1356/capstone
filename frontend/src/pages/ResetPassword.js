// import React, { useState } from 'react';
// import { Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { reset_password } from '../actions/auth';

// const ResetPassword = (props) => {
//     const [requestSent, setRequestSent] = useState(false);

//     const [formData, setFormData] = useState({
//         email: ''
//     });

//     const { email } = formData;

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const onSubmit = e => {
//         e.preventDefault();

//         props.reset_password(email);
//         setRequestSent(true);
//     };

//     if (requestSent)
//         return <Redirect to='/' />
//     return (
//         <div className='container mt-5'>
//             <h1>Request Password Reset:</h1>
//             <form onSubmit={e => onSubmit(e)}>
//                 <div className='form-group'>
//                     <input
//                         className='form-control'
//                         type='email'
//                         placeholder='Your Email'
//                         name='email'
//                         value={email}
//                         onChange={e => onChange(e)}
//                         required
//                     />
//                 </div>
//                 <button className='btn btn-primary' type='submit'>Reset Password</button>
//             </form>
//         </div>
//     );
// };

// export default connect(null, { reset_password })(ResetPassword);

import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password } from "../actions/auth";

import * as TiIcons from "react-icons/ti";
import * as FaIcons from "react-icons/fa";

const ResetPassword = (props) => {
  const [requestSent, setRequestSent] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    props.reset_password(email);
    setRequestSent(true);
  };

  if (requestSent) return <Redirect to="/" />;

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
                <h5>Request Password Reset </h5>
                <div class="row">
                  <div class="col-lg-12">
                    <div class="checkout__form__input">
                      <p>
                        Enter Your Email <span>*</span>
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
                  </div>
                  <button type="submit" class="site-btn btn_login">
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default connect(null, { reset_password })(ResetPassword);
