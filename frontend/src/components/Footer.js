import React from 'react'
import { Link } from 'react-router-dom';
import logo from './logo.webp';

import { AiTwotoneHeart } from "react-icons/ai";
import { FaFacebookF,FaTwitter,FaInstagram,FaYoutube,FaPinterestP } from "react-icons/fa";
function Footer() {
    return (
        <div>
            
        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-sm-7">
                        <div class="footer__about">
                            <div class="footer__logo">
                            <Link to='/'>
                    <img src={logo} alt="" />
                    </Link>
                           
                           
                            </div>
                            <p>Best shopping Ecommerce site</p>
                       
                       
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-3 col-sm-5">
                        <div class="footer__widget">
                            <h6>Quick links</h6>
                            <ul>
                                <li><Link to='/'>About</Link></li>
                                <li><Link to='/'>Blogs</Link></li>
                                <li><Link to='/'>Contact</Link></li>
                                <li><Link to='/'>FAQ</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-3 col-sm-4">
                        <div class="footer__widget">
                            <h6>Account</h6>
                            <ul>
                                <li><Link to='/account'>My Account</Link></li>
                                <li><Link to='/orders'>Orders Tracking</Link></li>
                                <li><Link to='/cart'>Checkout</Link></li>
                                <li><Link to='/wishlist'>Wishlist</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-8 col-sm-8">
                        <div class="footer__newslatter">
                            <h6>NEWSLETTER</h6>
                            <form action="#">
                                <input type="text" placeholder="Email" />
                                <button type="submit" class="site-btn">Subscribe</button>
                            </form>
                            <div class="footer__social">
                                <Link to='/'><FaFacebookF/></Link>
                                <Link to='/'><FaTwitter/></Link>
                                <Link to='/'><FaInstagram/></Link>
                                <Link to='/'><FaYoutube/></Link>
                                <Link to='/'><FaPinterestP/></Link>
                                
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="footer__copyright__text">
                            <p>
                                Copyright ©
                                <script type="text/javascript" async="" src="./Ashion _ Template_files/analytics.js"></script>
                                <script>
                                    document.write(new Date().getFullYear());
                                </script>
                                2021 All rights reserved | This template is made with <AiTwotoneHeart /> by Group of MB
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>




        </div>
    )
}

export default Footer
