

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

import * as load_product_actions from "../actions/prostore";
import { add_to_cart_handle } from "../actions/prostore";

import { Link } from "react-router-dom";

import * as AiIcons from "react-icons/ai";
import * as TiIcons from "react-icons/ti";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";

function ProductDatails({ Products }) {
  const dispatch = useDispatch();

  const getproduct = async () => {
    await dispatch(load_product_actions.load_product());
  };

  var rattotal = 0;
  Products[0].rating_list.map((rats) => (rattotal = rattotal + rats.rating));
  const avgrat = rattotal / Products[0].rating_list.length;

  const avgrating = Math.floor(avgrat);
  useEffect(() => {
    getproduct();
  }, []);

  // console.log(Cartvalue);

  //This is for Qty
  const [qty, setQty] = React.useState(1);
  const incrementQty = () => {
    setQty(qty + 1);
  };

  const decrementQty = () => {
    setQty(qty > 1 ? qty - 1 : qty);
  };

  // console.log(Products);

  const addToCart = async (Product, qty) => {
    await dispatch(load_product_actions.add_to_cart_handle(Product, qty));
  };

  const addToWishlist = async (Product) => {
    await dispatch(load_product_actions.add_to_wishlist_handle(Product));
  };

  

  return (
    <div className="detail">
      <div class="breadcrumb-option">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="breadcrumb__links">
                <Link to="/">
                  <TiIcons.TiHome className="homeIcon" /> Home
                </Link>
                <FaIcons.FaAngleRight />
                <Link to="/">Women’s</Link>
                <FaIcons.FaAngleRight />
                
                <span>Essential structured blazer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="product-details spad">
        <div class="container">
          {Products.map((Product, index) => (
            <div key={index} class="row">
              <div class="col-lg-6">
                <img src={Product.image} alt="" />
              </div>

              <div class="col-lg-6">
                <div class="product__details__text">
                  <h3>
                    {Product.title}
                    <span style={{ marginLeft: 1 + "px" }}>
                      
                    </span>
                  </h3>
                  <div class="rating">
                    {[...Array(avgrating)].map((_, i) => (
                      <AiIcons.AiTwotoneStar />
                    ))}

                    <span>( {Products[0].rating_list.length} reviews )</span>
                  </div>
                  <div class="product__details__price">Rs. {Product.price}</div>
                  <p>{Product.description}</p>
                  <div class="product__details__button">
                    <div class="quantity">
                      <span>Quantity:</span>
                      <div class="pro-qty">
                        <span class="qtybtn left_side" onClick={decrementQty}>
                          -
                        </span>
                        <label className="qtybtn center_side">{qty}</label>
                        
                        <span class="qtybtn right_side" onClick={incrementQty}>
                          +
                        </span>
                      </div>
                    </div>

                    <p
                      type="submit"
                      class="cart-btn"
                      onClick={() => addToCart(Product, qty)}
                    >
                      <RiIcons.RiShoppingBagLine
                        style={{ marginBottom: 7 + "px" }}
                      />{" "}
                      Add to cart
                    </p>
                  

                    <ul>
                      <li>
                        <p
                          className="wishlisticon"
                          onClick={() => addToWishlist(Product)}
                        >
                          <AiIcons.AiOutlineHeart
                            style={{
                              marginBottom: 7 + "px",
                              fontSize: 20 + "px",
                              color: "red",
                            }}
                          />
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div class="product__details__widget">
                    <ul>
                      <li>
                        <span>Promotions:</span>
                        <p>Free shipping</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div class="col-lg-12">
            <div class="product__details__tab">
              <ul class="nav nav-tabs" role="tablist">
       

                <li class="nav-item">
                  <Link
                    class="nav-link"
                    data-toggle="tab"
                    to="#tabs-3"
                    role="tab"
                    aria-selected="false"
                    role="tab"
                    aria-selected="true"
                  >
                    Reviews ( {Products[0].rating_list.length} )
                  </Link>
                </li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane active" id="tabs-3" role="tabpanel">
               

                  <p className="rat_comment">
                    Comment <span></span>
                  </p>

                  {Products[0].rating_list.map((rat, index) => (
                    <div key={index} className="comment_box">
                      <p className="review_user">{rat.user}</p>
                      <div class="rating">
                        {[...Array(rat.rating)].map((_, i) => (
                          <AiIcons.AiTwotoneStar />
                        ))}
                      </div>

                      <p>{rat.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  Products: state.prostore.Products.filter(
    (product) => product.id === Number(ownProps.match.params.id)
  ),
  Cartvalue: state.prostore.Cartvalue,
  data: ownProps.match.params.id,
});

export default connect(mapStateToProps)(ProductDatails);
