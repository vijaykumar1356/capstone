import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as TiIcons from "react-icons/ti";
import * as FaIcons from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




function Account({User,isAuthenticated}) {


  if (!isAuthenticated) return <Redirect to="/login" />;
    return (
        



     <div className="checkout">
       
       <div class="breadcrumb-option">
         <div class="container">
           <div class="row">
             <div class="col-lg-12">
               <div class="breadcrumb__links">
                 <Link to="/">
                   <TiIcons.TiHome className="homeIcon" /> Home
                 </Link>
                 <FaIcons.FaAngleRight />
                 <span>Profile</span>
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
                <h5>Personal detail</h5>
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
           

           
           
            </div>
          </div>
        </div>
      </section>









        </div>
    )
}


const mapStateToProps = (state) => ({

      User: state.auth.user,
      isAuthenticated: state.auth.isAuthenticated,
    });
    
export default connect(mapStateToProps,{})(Account);
