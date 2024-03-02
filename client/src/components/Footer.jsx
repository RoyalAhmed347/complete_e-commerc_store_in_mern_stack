import React from "react";
import { Link } from "react-router-dom";
import { FaDiscord, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <section>
      <div className="footer">
        <div className="container">
          <div className="short_cotact">
            <div className="get_start">
              <p className="text">
                Ready to get started? <br /> talk to us to day
              </p>

              <Link to="/singin">
                <button className="btn">Get started</button>
              </Link>
            </div>
          </div>
          <div className="footer_inner">
            <div className="footer_about">
              <h2 className="sub_heading">WalMart</h2>
              <p className="text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatum, alias.
              </p>
            </div>
            <div className="footer_sub">
              <h2 className="sub_heading">Subscribe to get importnt updates</h2>
              <input type="text" placeholder="Enter email" />
              <button className="btn">Subscribe</button>
            </div>
            <div className="footer_social">
              <h2 className="sub_heading">Follow us</h2>
              <ul className="social_icons">
                <Link>
                  <li className="social_icon">
                    <FaDiscord size={18} />
                  </li>
                </Link>
                <Link>
                  <li className="social_icon">
                    <FaInstagram size={18} />
                  </li>
                </Link>
                <Link>
                  <li className="social_icon">
                    <FaYoutube size={18} />
                  </li>
                </Link>
              </ul>
            </div>
            <div className="footer_contact">
              <h2 className="sub_heading">Call us</h2>
              <p className="text">+92 323 1630229</p>
            </div>
          </div>
        </div>
        <hr className="divider" />
        <div className="copyrigth">
          <p className="text">
            Copyright ©2023 All rights reserved | This Website is made with by
            <Link to="https://royalahmed.netlify.com/" target="_ahmed">
              <span> RoyalAhmed </span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
