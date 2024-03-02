import React from "react";
import { Link } from "react-router-dom";
const Hero = ({ data }) => {
  return (
    <div className="containter">
      <div className="hero">
        <div className="hero_about">
          <p className="text hero_welcom">WELLcome TO</p>
          <h1 className="main_heading">{data}</h1>
          <p className="text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Consequatur repudiandae deleniti nulla at praesentium dolore
            consectetur.
          </p>
          <Link to="/cart">
            <button className="btn">Shop Now</button>
          </Link>
        </div>
        <div className="hero_images">
          <div className="inner_hero_imgs">
            <div className="imgBgBox"></div>
            <img src="./assets/images/hero.png" alt="heroimg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
