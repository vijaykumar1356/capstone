import { connect } from "react-redux";

import React, { useState, useEffect, Fragment } from "react";

import { Link, Redirect } from "react-router-dom";
import * as TiIcons from "react-icons/ti";
import * as GrIcons from "react-icons/gr";
import * as AiIcons from "react-icons/ai";
import * as VscIcons from "react-icons/vsc";
import cp from "./img/cp-1.jpg";
import * as FaIcons from "react-icons/fa";

import * as load_product_actions from "../actions/prostore";
import { useDispatch } from "react-redux";
import "./css/Cart.css";

function Cart({ Cartvalue, isAuthenticated }) {
  const dispatch = useDispatch();

  var Total = 0;
  Cartvalue.map(
    (Cartvalue) => (Total = Total + Cartvalue.price * Cartvalue.qty)
  );
  
  const deleteToCart = async (id) => {
    await dispatch(load_product_actions.delete_to_cart_handle(id));
  };

  
  const incrementQty = async (id, qty) => {
    let newQty = qty + 1;
    await dispatch(load_product_actions.update_cart_qty_handle(id, newQty));
  };

  const decrementQty = async (id, qty) => {
    let newQty = qty - 1;
    if (newQty < 1) {
      newQty = 1;
    }
    await dispatch(load_product_actions.update_cart_qty_handle(id, newQty));
  };

  const checkoutLink = (
    
    <Link to="/checkout">
        <p className="site-btn">
          Proceed to checkout
        </p>
    </Link>
    
  );

  const loginLinks = (
    <Link to="/login">
      
      <p className="site-btn">
          Requried Login
      </p>
    </Link>
  );

  return (
    <div>
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
      <section class="shop-cart spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="shop__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Cartvalue.map((Cartvalue, index) => (
                      <tr key={index}>
                        <td class="cart__product__item">
                          <img src={Cartvalue.image} alt="" style={{ width:8+"rem",height:8+"rem" }}/>
                          
                          <div class="cart__product__item__title">
                            <h6>{Cartvalue.title}</h6>
                            
                          
                          </div>
                        </td>
                        <td class="cart__price">Rs.{Cartvalue.price}</td>
                        <td class="cart__quantity format">
                          <div class="pro-qty">
                            <span
                              class="qtybtn left_side"
                              onClick={() =>
                                decrementQty(Cartvalue.id, Cartvalue.qty)
                              }
                            >
                              -
                            </span>
                            <label className="qtybtn center_side">
                              {" "}
                              {Cartvalue.qty}
                            </label>
                            <span
                              class="qtybtn right_side"
                              onClick={() =>
                                incrementQty(Cartvalue.id, Cartvalue.qty)
                              }
                            >
                              +
                            </span>
                          </div>
                        </td>
                        <td class="cart__total">
                          Rs. {Cartvalue.price * Cartvalue.qty}.00
                        </td>

                        <td
                          class="cart__close"
                          onClick={() => deleteToCart(Cartvalue.id)}
                        >
                          <span class="icon_close">
                            {" "}
                            <GrIcons.GrClose />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="row">
            <div class="col-lg-6 col-md-6 col-sm-6">
              <div class="cart__btn">
                <Link to="/">Continue Shopping</Link>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
              <div class="cart__btn update__btn">
                <Link to="/">
                  <span class="icon_loading">
                    <VscIcons.VscLoading />
                  </span>{" "}
                  Update cart
                </Link>
              </div>
            </div>
          </div>
          {
            <Fragment>
              <div class="row">
                <div class="col-lg-5">
                  <div class="cart__total__procced">
                    <h6>Cart total</h6>
                    <ul>
                      <li>
                        Subtotal <span>Rs. {Total}.00</span>
                      </li>
                      <li>
                        Total <span>Rs. {Total}.00</span>
                      </li>
                    </ul>

                
                    {
                      <Fragment>
                        {isAuthenticated ? checkoutLink : loginLinks}
                      </Fragment>
                    }
                  </div>
                </div>
                <div class="col-lg-4 offset-lg-2"></div>
              </div>
            </Fragment>
          }
        </div>
      </section>
    </div>
  );
}

// export default Cart

const mapStateToProps = ({ prostore, auth }) => ({
  Cartvalue: prostore.Cartvalue,
  isAuthenticated: auth.isAuthenticated,
});

export default connect(mapStateToProps)(Cart);
