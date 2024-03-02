import React, { useState } from "react";
import { useAuthHook } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const ContactSection = () => {
  const [contect, setcontect] = useState({
    userName: "",
    email: "",
    message: "",
  });
  const { logInUser } = useAuthHook();

  const inputEvent = (e) => {
    const { name, value } = e.target;

    if (logInUser) {
      setcontect({
        userName: `${logInUser.firstName} ${logInUser.lastName}`,
        email: logInUser.email,
      });
    }

    setcontect((perVal) => {
      return {
        ...perVal,
        [name]: value,
      };
    });
  };

  const submitContact = async (e) => {
    e.preventDefault();
    try {
      const result = await axios({
        url: "http://localhost:3002/api/contact",
        method: "POST",
        data: contect,
        headers: {},
      });

      setcontect({
        userName: "",
        email: "",
        message: "",
      });
      toast.success("Message successful sent");
    } catch (error) {
      toast.error(
        error.response.data.errorDetails
          ? error.response.data.errorDetails
          : error.response.data.message
      );
    }
  };

  return (
    <div className="contact">
      <h1 className="main_heading">Contact Page</h1>
      <div className="google_map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6797.67608080006!2d74.36898329498187!3d31.583488936423002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39191ac38818005f%3A0xe1612460de0fb770!2sBaghbanpura%2C%20Lahore%2C%20Punjab%2054000%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700648929483!5m2!1sen!2s"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Contact Google Map"
        ></iframe>
      </div>

      <div className="container">
        <div className="contact_form">
          <form onSubmit={submitContact}>
            <input
              placeholder="Username"
              type="text"
              value={
                logInUser
                  ? `${logInUser.firstName} ${logInUser.lastName}`
                  : contect.userName
              }
              name="userName"
              onChange={!logInUser && inputEvent}
              required
            />
            <input
              placeholder="Email"
              value={logInUser ? logInUser.email : contect.email}
              type="text"
              name="email"
              onChange={!logInUser && inputEvent}
              required
            />

            <textarea
              placeholder="Massage"
              value={contect.message}
              name="message"
              onChange={inputEvent}
              required
              cols="30"
              rows="7"
            ></textarea>
            <button className="btn" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
