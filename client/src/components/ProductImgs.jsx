import React, { useState } from "react";

const Product_imgs = ({ id, thumbnail, images = [""] }) => {
  const [mainImg, setmainImg] = useState(thumbnail);
  const [imgIndex, setimgIndex] = useState(1);
  return (
    <>
      <div className="all_imgs">
        <img
          src={`http://localhost:3002/${thumbnail}`}
          alt={id}
          onClick={() => {
            setmainImg(thumbnail);
            setimgIndex(1);
          }}
        />
        {images.map((elem, index) => {
          return (
            <img
              key={index}
              src={`http://localhost:3002/${elem}`}
              alt={id}
              onClick={() => {
                setmainImg(elem);
                setimgIndex(index + 2);
              }}
            />
          );
        })}
      </div>
      <div className="main_img">
        <img src={`http://localhost:3002/${mainImg}`} alt="mainImag" />
        <p className="text">
          {images.length + 1} of {imgIndex}
        </p>
      </div>
    </>
  );
};

export default Product_imgs;
