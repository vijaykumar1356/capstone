import { connect } from "react-redux";
import * as load_order_user from "../actions/prostore";
import React, { useState, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";

import { Link, Redirect } from "react-router-dom";
import * as TiIcons from "react-icons/ti";
import * as GrIcons from "react-icons/gr";
import * as AiIcons from "react-icons/ai";
import * as VscIcons from "react-icons/vsc";
import cp from "./img/cp-1.jpg";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";

import "./css/Cart.css";

function Orders({ User, isAuthenticated, Userorder }) {
  const dispatch = useDispatch();
  
  

  const getOrderAndDetail = async () => {
    await dispatch(load_order_user.load_user_order_detail(User["id"]));
  };

  useEffect(() => {
    if (isAuthenticated) {
      getOrderAndDetail();
    }
  }, []);

  // console.log(Userorder);

  if (!isAuthenticated) return <Redirect to="/login" />;

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

      {Userorder.map((order, index) => (
   

        <section class="shop-cart spad" key={index}>
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

                        <th>Give Rating</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, key) => (
                        <tr key={key}>
                          <td class="cart__product__item">
                            {/* <img src={cp} alt="" /> */}

                            <img src={`http://127.0.0.1:8000/media/${item.image}`} alt="" style={{ width:8+"rem",height:8+"rem" }}/>

                            <div class="cart__product__item__title">
                              <h6>{item.item}</h6>
                            </div>
                          </td>
                          <td class="cart__price">Rs. {item.price}</td>
                          <td class="cart__quantity format">
                            <div class="pro-qty">
                              <label className="qtybtn center_side">
                                {item.quantity}
                              </label>
                            </div>
                          </td>

                          {/* <p type="submit" class="cart-btn"><RiIcons.RiShoppingBagLine style={{marginBottom:7+'px'}} /> Add to cart</p>                                           */}
                          {/* <td><span class="icon_close"><Link to='/checkout' className="primary-btn">Give Rating</Link> </span></td> */}
                          <Link to={`/rating/${item.id}`}>
                            <td class="rating_btn">Give Rating</td>
                          </Link>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-5">
                <div class="cart__total__procced">
                  <h6>Order Detail</h6>
                  <ul>
                    <li>
                      Order Id <span>{order.order_id}</span>
                    </li>
                    <li>
                      Payment Id <span>{order.payment_id}</span>
                    </li>
                    <li>
                      Order Date <span>{order.date_ordered}</span>
                    </li>
                    <li>
                      Total <span>Rs. {order.total}.00</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

const mapStateToProps = ({ prostore, auth }) => ({
  Orders: prostore.Orders,
  isAuthenticated: auth.isAuthenticated,
  User: auth.user,
  Userorder: prostore.Userorder,
});

export default connect(mapStateToProps)(Orders);
