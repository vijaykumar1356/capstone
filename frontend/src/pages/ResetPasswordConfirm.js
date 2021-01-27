// import React, { useState } from 'react';
// import { Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { reset_password_confirm } from '../actions/auth';

// const ResetPasswordConfirm = (props) => {
//     const [requestSent, setRequestSent] = useState(false);

//     const [formData, setFormData] = useState({
//         new_password: '',
//         re_new_password: ''
//     });

//     const { new_password, re_new_password } = formData;

//     const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const onSubmit = e => {
//         e.preventDefault();

//         const uid = props.match.params.uid;
//         const token = props.match.params.token;

//         props.reset_password_confirm(uid, token, new_password, re_new_password);
//         setRequestSent(true);
//     };

//     if (requestSent)
//         return <Redirect to='/' />
//     return (
//         <div className='container mt-5'>
//             <form onSubmit={e => onSubmit(e)}>
//                 <div className='form-group'>
//                     <input
//                         className='form-control'
//                         type='password'
//                         placeholder='New Password'
//                         name='new_password'
//                         value={new_password}
//                         onChange={e => onChange(e)}
//                         minLength='6'
//                         required
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <input
//                         className='form-control'
//                         type='password'
//                         placeholder='Confirm New Password'
//                         name='re_new_password'
//                         value={re_new_password}
//                         onChange={e => onChange(e)}
//                         minLength='6'
//                         required
//                     />
//                 </div>
//                 <button className='btn btn-primary' type='submit'>Reset Password</button>
//             </form>
//         </div>
//     );
// };

// export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);

import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm } from "../actions/auth";

import * as TiIcons from "react-icons/ti";
import * as FaIcons from "react-icons/fa";

const ResetPasswordConfirm = (props) => {
  const [requestSent, setRequestSent] = useState(false);

  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { new_password, re_new_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    const uid = props.match.params.uid;
    const token = props.match.params.token;

    props.reset_password_confirm(uid, token, new_password, re_new_password);
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
                <span>Reset Password</span>
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
                        Enter New Password <span>*</span>
                      </p>
                      <input
                        className="form-control"
                        type="password"
                        name="new_password"
                        value={new_password}
                        onChange={(e) => onChange(e)}
                        minLength="6"
                        required
                      />
                    </div>

                    <div class="checkout__form__input">
                      <p>
                        Confirm New Password <span>*</span>
                      </p>

                      <input
                        className="form-control"
                        type="password"
                        name="re_new_password"
                        value={re_new_password}
                        onChange={(e) => onChange(e)}
                        minLength="6"
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

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);
