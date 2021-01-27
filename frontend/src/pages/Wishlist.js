import React, { useState, useEffect } from "react";
import * as load_product_actions from "../actions/prostore";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as TiIcons from "react-icons/ti";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import Background from "./img/product-1.jpg";

function Wishlist({ wishlistdata }) {
  console.log(wishlistdata);
  const dispatch = useDispatch();

  // const getproduct =async()=>{

  //     await dispatch(load_product_actions.load_product())
  // }
  // // console.log(Products)

  // useEffect(()=>
  // {
  //     getproduct()

  // },[])

  const addToCart = async (Product, qty) => {
    await dispatch(load_product_actions.add_to_cart_handle(Product, qty));
  };

  const addToWishlist = async (wishlistdata) => {
    await dispatch(load_product_actions.add_to_wishlist_handle(wishlistdata));
  };

  var picon = {
    fontSize: 20 + "px",
    paddingBottom: 0.2 + "em",
  };
  var bgimg = {
    backgroundImage: "url(" + { Background } + ")",
  };
  return (
    <div className="products">
      <div class="breadcrumb-option">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="breadcrumb__links">
                <Link to="/">
                  <TiIcons.TiHome className="homeIcon" /> Home
                </Link>
                <FaIcons.FaAngleRight />
                <span>Wishlist</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="shop spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-1 col-md-1"></div>

            <div class="col-lg-0 col-md-9">
              <div class="row">
                {wishlistdata.map((wishlist, index) => (
                  <div key={index} class="col-lg-4 col-md-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        data-setbg={Background}
                        style={wishlist.img}
                      >
                        <img src={wishlist.image} alt="" />
                        <div class="label new">New</div>
                        <ul class="product__hover">
                          <li>
                            <Link
                              to={`/productdetails/${wishlist.id}`}
                              class="image-popup"
                            >
                              <BsIcons.BsWallet style={picon} />
                            </Link>
                          </li>
                          <li>
                            <Link to="/">
                              <AiIcons.AiOutlineHeart style={picon} />
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/cart"
                              onClick={() => addToCart(wishlist, 1)}
                            >
                              {" "}
                              <RiIcons.RiShoppingBagLine style={picon} />
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div class="product__item__text">
                        <h6>
                          <Link to="#">{wishlist.title}</Link>
                        </h6>
                        <div class="rating">
                          <AiIcons.AiTwotoneStar />
                          <AiIcons.AiTwotoneStar />
                          <AiIcons.AiTwotoneStar />
                          <AiIcons.AiTwotoneStar />
                          <AiIcons.AiTwotoneStar />
                        </div>
                        <div class="product__price">{wishlist.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// export default Products

const mapStateToProps = ({ prostore }) => ({
  wishlistdata: prostore.Wishlistvalues,
});

export default connect(mapStateToProps)(Wishlist);
