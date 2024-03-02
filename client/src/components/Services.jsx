import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdOutlineContactPhone } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";

const Services = () => {
  return (
    <div className="container">
      <div className="services">
        <div className="s_box">
          <TbTruckDelivery className="servic_icon" size={50} />
          <p className="text">Super fast and Free Delivery</p>
        </div>
        <div className="s_box sec_s_box">
          <div className="sub_s_box">
            <MdOutlineContactPhone className="servic_icon" size={50} />
            <p className="text">Non - Contact Shipping</p>
          </div>
          <div className="sub_s_box">
            <GiReceiveMoney className="servic_icon" size={50} />
            <p className="text">Money - back guranted</p>
          </div>
        </div>
        <div className="s_box">
          <RiSecurePaymentLine className="servic_icon" size={50} />
          <p className="text">Super fast and Free Delivery</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
