import { connect } from 'react-redux';
import { logout } from '../actions/auth';

import React, { useState,useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import logo from './logo.webp';

import * as AiIcons from 'react-icons/ai';

import * as RiIcons from "react-icons/ri";
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from "react-icons/bs";
import './Navbar.css';
import { SidebarData } from './SidebarData';


const Navbar = ({ isAuthenticated, logout,Cartvalue,Wishlistvalues }) => {
    const authLinks = (
        
            <Link to='/' onClick={logout}>Logout</Link>            
        
    );
    var qty=0;
    
    Cartvalue.map((Cartvalue) => qty=qty+Cartvalue.qty)
    

    var wishvalue=Wishlistvalues.length;


    const guestLinks = (
        <Fragment>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            
        </Fragment>
    );



    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        






    <div>            
        <header class="header">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-3 col-lg-2">
                    <div class="header__logo">
                    <Link to='/'>
                    <img src={logo} alt="" />
                    </Link>
                        
                    </div>
                </div>
                <div class="col-xl-6 col-lg-12">
                    <nav class="header__menu">
                        <ul>
                            <li class="active"><Link to='/'>Home</Link></li>
                            <li>  <Link to="/products/woman">Women’s </Link></li>
                            <li>  <Link to='/products/man'>Men’s </Link></li>
                            <li>  <Link to='/products/kid'>Kid’s </Link></li>
                            <li>  <Link to='/products/accessories'>Accessories </Link></li>
                            
                            <li>
                            <Link to='#'>Account</Link>
                                <ul class="dropdown">
                                    <li><Link to='/account'>Profile</Link></li>
                                    <li><Link to='/orders'>Order History</Link></li>
                                    
                                </ul>
                            </li>
                         
                            
                        </ul>
                        
                    </nav>
                </div>
            
                <div class="col-lg-3">
                    <div class="header__right">
                        <div class="header__right__auth">
                     
                        {/* <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link> */}

                        { <Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment> }

                        </div>
                        <ul class="header__right__widget">
                            <li><span class="icon_search search-switch">
                            <BsIcons.BsSearch /></span></li>
                            <li>
                                <Link to='/wishlist'>
                                    <span class="icon_heart_alt heart">
                                    <AiIcons.AiOutlineHeart />
                                    </span>
                                    <div class="tip">{wishvalue}</div>
                                   
                                </Link>
                            </li>
                            <li>
                            <Link to='/cart'>
                                    <span class="icon_bag_alt">
                                    <RiIcons.RiShoppingBagLine />
                                    </span>
                                    <div class="tip">{qty}</div>
                                    
                            </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            
            </div>
            <div class="canvas__open">
                <FaIcons.FaBars onClick={showSidebar} />
            </div>
        </div>
        </header>


        <div class={sidebar ? 'offcanvas-menu-wrapper active' : 'offcanvas-menu-wrapper'}>        
            <ul class="offcanvas__widget">
                <li><span class="icon_search search-switch">
                    <BsIcons.BsSearch /></span>
                </li>
                <li>
                    <Link to='/wishlist'>
                        <span class="icon_heart_alt">
                        <AiIcons.AiOutlineHeart />
                        </span>
                        <div class="tip">{wishvalue}</div>                     
                    </Link>
                </li>
                <li>
                    <Link to='/cart'>
                        <span class="icon_bag_alt">
                        <RiIcons.RiShoppingBagLine />
                        </span>
                        <div class="tip">{qty}</div>                    
                    </Link>
                </li>
               
            </ul>
         
            <div id="mobile-menu-wrap">
                <div class="slicknav_menu">

                <nav class="slicknav_nav">
                    <ul>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    
                                    <span>{item.title}</span>
                                </Link>
                                </li>
                            );
                        })}

                    </ul>

                    </nav>

              
                </div>

            </div>




            <div class="offcanvas__auth">
            { <Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment> }
            </div>
            
        </div>
    </div>
   
    )
}

// export default Navbar




const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    Cartvalue: state.prostore.Cartvalue,
    Products: state.prostore.Products,
    Wishlistvalues: state.prostore.Wishlistvalues,
});

export default connect(mapStateToProps, { logout })(Navbar);




// const mapStateToProps = ({prostore}) => ({
//     Cartvalue: prostore.Cartvalue
// });
