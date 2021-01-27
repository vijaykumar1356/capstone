import React, { useEffect } from "react";
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

function Products({ Products,category }) {
  const dispatch = useDispatch();

  
  
  
  const getproduct = async () => {
    await dispatch(load_product_actions.load_product());
  };
  useEffect(() => {
    getproduct();
  }, []);

  const addToCart = async (Product, qty) => {
    await dispatch(load_product_actions.add_to_cart_handle(Product, qty));
  };

  const addToWishlist = async (Product) => {
    await dispatch(load_product_actions.add_to_wishlist_handle(Product));
  };

  const categoryfilter = async (categoryname) => {
    console.log(categoryname)
    console.log(Products)
    // Products=Products.filter((product) => product.category === "man")
    // console.log(Products)
    
  };

  
  let avgrate=[];
  for(var product=0;product<Products.length;product++){  
    let totalrating=0;
    for(var j = 0;j<Products[product].rating_list.length;j++){            
      totalrating=totalrating+Products[product].rating_list[j]["rating"];      
    }
    var result = totalrating / Products[product].rating_list.length;
    const pushdata = Math.floor(result);
    avgrate.push(pushdata)


  }

  var picon = {
    fontSize: 20 + "px",
    paddingBottom: 0.2 + "em",
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
                <span>Shop</span>
              </div>
            </div>
          </div>
        </div>
      </div>











      <section class="shop spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-3">
              <div class="shop__sidebar">
                <div class="sidebar__categories">
                  <div class="section-title">
                    <h4>Categories</h4>
                  </div>
                  <div class="categories__accordion">
                    <div class="accordion" id="accordionExample">
                      <div class="card">
                        <div class="card-heading">
                        
                          <Link to="/products/woman">Women </Link>
                          
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-heading">
                    
                         <Link to='/products/man'>Men </Link>
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-heading">
                        <Link to='/products/kid'>Kids </Link>
                         
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-heading">
                        <Link to='/products/accessories'>Accessories </Link>
                     
                        </div>
                      </div>
                      <div class="card">
                        <div class="card-heading">
                        <Link to='/products/cosmetic'>Cosmetic</Link>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-9 col-md-9">
              <div class="row">
                {Products.map((Product, index) => (
                  <div key={index} class="col-lg-4 col-md-6">
                    <div class="product__item">
                      
                      <div
                        class="product__item__pic set-bg"
                        data-setbg={Background}
                        style={Product.img}
                      >
                        <img src={Product.image} alt="" />
                        <div class="label new">New</div>
                        <ul class="product__hover">
                          <li>
                            <Link
                              to={`/productdetails/${Product.id}`}
                              class="image-popup"
                            >
                              <BsIcons.BsWallet style={picon} />
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/wishlist"
                              onClick={() => addToWishlist(Product)}
                            >
                              <AiIcons.AiOutlineHeart style={picon} />
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/cart"
                              onClick={() => addToCart(Product, 1)}
                            >
                              {" "}
                              <RiIcons.RiShoppingBagLine style={picon} />
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div class="product__item__text">
                        <h6>
                          <Link to="#">{Product.title}</Link>
                        </h6>
                        
                        <div class="rating">
                        {[...Array(avgrate[index])].map((_, i) => (
                          <AiIcons.AiTwotoneStar />
                        ))}
                          
                        </div>
                        <div class="product__price">Rs. {Product.price}</div>
                      </div>
                    </div>
                    {/* </Link> */}
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

const mapStateToProps = (state,ownProps) => ({
  // Products: state.prostore.Products,  
  Products: state.prostore.Products.filter(
    (product) => product.category === ownProps.match.params.category
  ),
  category: ownProps.match.params.category,
  
  
});

export default connect(mapStateToProps)(Products);
