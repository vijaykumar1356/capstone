import React, { useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as TiIcons from "react-icons/ti";
import * as FaIcons from "react-icons/fa";
import { product_rating } from "../actions/prostore";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orders = ({ product_rating, isAuthenticated, User, product_id }) => {
  const [formData, setFormData] = useState({
    comment: "",
    rating: "",
  });

  const [submitFlag, setsubmitFlag] = useState(0);
  const { comment, rating } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    product_rating(comment, rating, product_id, User["id"]);

    toast("Thank you for sharing you Review");

    setTimeout(submitfunc, 4000);
  };
  function submitfunc() {
    setsubmitFlag(1);
  }
  if (submitFlag) return <Redirect to="/" />;

  if (!isAuthenticated) return <Redirect to="/login" />;

  return (
    <div className="login">
      <ToastContainer />

      <div class="breadcrumb-option">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="breadcrumb__links">
                <Link to="/">
                  <TiIcons.TiHome className="homeIcon" /> Home
                </Link>
                <FaIcons.FaAngleRight />
                <span>Rating</span>
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
                <h5>Rating </h5>
                <div class="row">
                  <div class="col-lg-12">
                    <div class="checkout__form__input">
                      <p>
                        Comment <span>*</span>
                      </p>
                      <textarea
                        className="text_area"
                        type="text"
                        name="comment"
                        rows="4"
                        cols="50"
                        value={comment}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>
                  </div>

                  <div class="col-lg-12">
                    <div class="x_select">
                      <p>
                        Rate this product<span>*</span>
                      </p>
                      <select
                        className="select_box"
                        id="rating"
                        name="rating"
                        onChange={(e) => onChange(e)}
                        required
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" class="site-btn btn_login">
                    Rating
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

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  User: state.auth.user,
  product_id: Number(ownProps.match.params.product_id),
});

export default connect(mapStateToProps, { product_rating })(Orders);
