import React from "react";
import { Link } from "react-router-dom";
import cat1 from "./img/category-1.jpg";

import cat2 from "./img/category-2.jpg";
import cat3 from "./img/category-3.jpg";
import cat4 from "./img/category-4.jpg";
import cat5 from "./img/category-5.jpg";
import dis from "./img/discount.jpg";

import { AiFillCar } from "react-icons/ai";
import { BiMoney } from "react-icons/bi";
import { GiRoundStrawBale } from "react-icons/gi";

import { ImHeadphones } from "react-icons/im";
function Home() {
  // "transform: translate3d(-1305px, 0px, 0px); transition: all 1.2s ease 0s; width: 4568px;"
  const x = -1305;
  const y = 0;
  const z = 0;

  return (
    <div className="home">
      <section class="categories">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-6 p-0">
              <div
                class="categories__item categories__large__item set-bg"
                data-setbg="img/categories/category-1.jpg"
                style={{ backgroundImage: `url(${cat1})` }}
              >
                <div class="categories__text">
                  <h1>Women’s fashion</h1>
                  <p>
                    Sitamet, consectetur adipiscing elit, sed do eiusmod tempor
                    incidid-unt labore edolore magna aliquapendisse ultrices
                    gravida.
                  </p>
                  <Link to="/products/woman">Shop now</Link>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6 p-0">
                  <div
                    class="categories__item set-bg"
                    data-setbg="img/categories/category-2.jpg"
                    style={{ backgroundImage: `url(${cat2})` }}
                  >
                    <div class="categories__text">
                      <h4>Men’s fashion</h4>
                      <p>358 items</p>
                      <Link to="/products/man">Shop now</Link>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 p-0">
                  <div
                    class="categories__item set-bg"
                    data-setbg="img/categories/category-3.jpg"
                    style={{ backgroundImage: `url(${cat3})` }}
                  >
                    <div class="categories__text">
                      <h4>Kid’s fashion</h4>
                      <p>273 items</p>
                      <Link to="/products/kid">Shop now</Link>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 p-0">
                  <div
                    class="categories__item set-bg"
                    data-setbg="img/categories/category-4.jpg"
                    style={{ backgroundImage: `url(${cat4})` }}
                  >
                    <div class="categories__text">
                      <h4>Cosmetics</h4>
                      <p>159 items</p>
                      <Link to="/products/cosmetic">Shop now</Link>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 p-0">
                  <div
                    class="categories__item set-bg"
                    data-setbg="img/categories/category-5.jpg"
                    style={{ backgroundImage: `url(${cat5})` }}
                  >
                    <div class="categories__text">
                      <h4>Accessories</h4>
                      <p>792 items</p>
                      <Link to="/products/accessories">Shop now</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="discount">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 p-0">
              <div class="discount__pic">
                <img src={dis} alt="" />
              </div>
            </div>
            <div class="col-lg-6 p-0">
              <div class="discount__text">
                <div class="discount__text__title">
                  <span>Discount</span>
                  <h2>Summer 2019</h2>
                  <h5>
                    <span>Sale</span> 50%
                  </h5>
                </div>
                <div class="discount__countdown" id="countdown-time">
                  <div class="countdown__item">
                    <span>30</span>
                    <p>Day</p>
                  </div>
                  <div class="countdown__item">
                    <span>09</span>
                    <p>Hour</p>
                  </div>
                  <div class="countdown__item">
                    <span>30</span>
                    <p>Min</p>
                  </div>
                  <div class="countdown__item">
                    <span>21</span>
                    <p>Sec</p>
                  </div>
                </div>

                <Link to="/products/sale">Shop now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="services spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-4 col-sm-6">
              <div class="services__item" style={{color:"#ca1515"}}>
                <AiFillCar style={{fontSize:3+"rem",marginLeft:.6+"em"}}/>
                <h6 >Free Shipping</h6>
                <p>For all oder over $99</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
              <div class="services__item" style={{color:"#ca1515"}}>
              <BiMoney style={{fontSize:3+"rem",marginLeft:1.3+"em"}}/>
                <h6>Money Back Guarantee</h6>
                <p>If good have Problems</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
              <div class="services__item" style={{color:"#ca1515"}}>
              <GiRoundStrawBale style={{fontSize:3+"rem",marginLeft:1+"em"}}/>
                <h6>Online Support 24/7</h6>
                <p>Dedicated support</p>
              </div>
            </div>
            <div class="col-lg-3 col-md-4 col-sm-6">
              <div class="services__item" style={{color:"#ca1515"}}>
              <ImHeadphones style={{fontSize:3+"rem",marginLeft:.7+"em"}}/>
                <h6>Payment Secure</h6>
                <p>100% secure payment</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
