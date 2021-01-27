import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import * as TiIcons from "react-icons/ti";
import * as FaIcons from "react-icons/fa";
import logo from './img/logo.webp';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {empty_to_cart_handle,delete_to_cart_handle} from "../actions/prostore";
import { useDispatch } from "react-redux";

function paymentHandler(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function Checkout({ isAuthenticated, Cartvalue, User,EMPTY_TO_CART }) {
  
  const dispatch = useDispatch();

  const [orderdata, setorderdata] = useState(0);

  var Total = 0;
  Cartvalue.map(
    (Cartvalue) => (Total = Total + Cartvalue.price * Cartvalue.qty)
  );
  var ProdID = [];
  Cartvalue.map((Cartvalue) => ProdID.push(Cartvalue.id));
  var order_id = 0;

  async function displayRazorpay() {
    const res = await paymentHandler(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed! Are You Online?");
      return;
    }

    const body = JSON.stringify({ Total: Total.toString() });
    const reds = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/order/test/`,
      body
    );

    var options = {
      key: "rzp_test_qcQMd5GfJhZAyQ",
      amount: reds.data["amount"],
      currency: reds.data["currency"],
      name: "Ashion",
      description: "Thank You For Shopping!",
      image: logo,
      order_id: reds.data["id"],
      handler: function (response) {
        const orderdetail = JSON.stringify({
          id: User.id,
          user: User.id,
          total: Total,
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
        });
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/api/orderdetail/`,
            orderdetail
          )
          .then(function (response) {
            order_id = response.data["id"];

            for (var i = 0; i < Cartvalue.length; i++) {
              const orderitemdetail = JSON.stringify({
                order: order_id,
                qty: Cartvalue[i]["qty"],
                product: Cartvalue[i]["id"],
              });
              axios.post(
                `${process.env.REACT_APP_API_URL}/api/orderitemdetail/`,
                orderitemdetail
              );
            }
            toast("Your order is confirmed!");

            setTimeout(submitorderfunc, 4000);

          });
      },
      prefill: {
        name: User.first_name,
        email: User.email,
        contact: User.phone,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  

  async function submitorderfunc() {
 
    await dispatch(empty_to_cart_handle(1));
 
    setorderdata(1);    
  }
  
  if (orderdata) return <Redirect to="/" refresh="true"/>;

  
  if (!isAuthenticated) return <Redirect  to="/login" />;


  return (
    <div className="checkout">
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
                <span>Shopping cart</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="checkout spad">
        <div class="container">
          <div class="checkout__form">
            <div class="row">
              <div class="col-lg-8">
                <h5>Billing detail</h5>
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="checkout__form__input">
                      <p>
                        First Name <span>*</span>
                      </p>
                      <input type="text" disabled value={User.first_name} />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="checkout__form__input">
                      <p>
                        Last Name <span>*</span>
                      </p>
                      <input type="text" disabled value={User.last_name} />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="checkout__form__input">
                      <p>
                        Address <span>*</span>
                      </p>
                      <input type="text" disabled value={User.address} />
                    </div>
                    <div class="checkout__form__input">
                      <p>
                        Phone <span>*</span>
                      </p>
                      <input type="text" disabled value={User.phone} />
                    </div>
                    <div class="checkout__form__input">
                      <p>
                        Email <span>*</span>
                      </p>
                      <input type="text" disabled value={User.email} />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="checkout__order">
                  <h5>Your order</h5>
                  <div class="checkout__order__product">
                    <ul>
                      <li>
                        <span class="top__text">Product</span>

                        <span class="top__text__right">Total</span>
                      </li>
                      {Cartvalue.map((Cartvalue, index) => (
                   
                        <li key={index}>
                          {index + 1}.{Cartvalue.title}
                          <span>Rs. {Cartvalue.price * Cartvalue.qty}.00</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div class="checkout__order__total">
                    <ul>
                      <li>
                        Subtotal <span>Rs. {Total}.00</span>
                      </li>
                      
                      <li>
                        Total <span>Rs. {Total}.00</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    type="submit"
                    class="site-btn"
                    onClick={displayRazorpay}
                  >
                    Place oder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => ({
  Cartvalue: state.prostore.Cartvalue,
  isAuthenticated: state.auth.isAuthenticated,
  User: state.auth.user,
});

export default connect(mapStateToProps,{empty_to_cart_handle})(Checkout);
// export default connect(mapStateToProps, { login })(Login);
