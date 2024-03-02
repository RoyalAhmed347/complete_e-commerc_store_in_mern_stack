import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdMenu, MdClose } from "react-icons/md";
import { useCartContext } from "../context/CartContext";
import { useAuthHook } from "../context/AuthContext";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { FiSettings } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";

const Nav = () => {
  const [manuToggler, setmanuToggler] = useState(false);
  const [profile, setProfile] = useState(false);
  const { cartItem } = useCartContext();
  const { logInUser } = useAuthHook();
  const [totalCartItems, settotalCartItems] = useState(0);

  useEffect(() => {
    let newTotal = cartItem.reduce((total, elem) => {
      return total + elem.quantity;
    }, 0);
    settotalCartItems(newTotal);
  }, [cartItem]);

  return (
    <div className="flex navbar drop-shadow-lg">
      <div className="brand_logo">
        <Link to="/">
          <img
            className="logo_img h-8 lg:h-10 "
            src="./assets/images/logo.png"
            alt="Logo"
          />
        </Link>
      </div>
      <div className=" nav_manu">
        <ul className={manuToggler ? `main_menu togged` : `main_menu `}>
          <NavLink to="/" onClick={() => setmanuToggler(false)}>
            <li className="nav_list">Home</li>
          </NavLink>
          <NavLink to="/about" onClick={() => setmanuToggler(false)}>
            <li className="nav_list">About</li>
          </NavLink>
          <NavLink to="/products" onClick={() => setmanuToggler(false)}>
            <li className="nav_list">Products</li>
          </NavLink>
          <NavLink to="/contact" onClick={() => setmanuToggler(false)}>
            <li className="nav_list">Contact</li>
          </NavLink>

          <NavLink to="/cart" onClick={() => setmanuToggler(false)}>
            <div className="cart_troly">
              <AiOutlineShoppingCart className="troly" size={25} />
              <span className="cart_count">{totalCartItems}</span>
            </div>
          </NavLink>

          {logInUser ? (
            <>
              <div
                className="flex items-center gap-1 cursor-pointer text-blue hidden lg:flex  "
                onClick={() => setProfile(!profile)}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden ">
                  <img
                    src={`http://localhost:3002/${logInUser.avtarURL}`}
                    alt="user"
                    className=""
                  />
                </div>
                <p>{`${logInUser.firstName} ${logInUser.lastName}`}</p>
                {profile ? <FaAngleUp /> : <FaAngleDown />}
              </div>

              {profile && (
                <div className="fixed drop-shadow-lg bg-white w-60 h-52 top-16 right-5 duration-[10000ms] ">
                  <div className="text-center mt-4">
                    <h1 className="text-xl font-bold font-Nunito">{`${logInUser.firstName} ${logInUser.lastName}`}</h1>
                    <p>{logInUser.email}</p>
                  </div>

                  <ul className="h-full w-full px-3 ">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 bg-white drop-shadow-lg mt-2 px-2 py-1	cursor-pointer"
                    >
                      <LuUser2 />
                      <p className="">My Profile</p>
                    </Link>
                    <Link
                      to="/update_profile"
                      className="flex items-center gap-2 bg-white drop-shadow-lg mt-2 px-2 py-1	cursor-pointer"
                    >
                      <FiSettings />
                      <p className="">Update Profile</p>
                    </Link>
                    <Link
                      to="/logout"
                      className="flex items-center gap-2 bg-white drop-shadow-lg mt-2 px-2 py-1	cursor-pointer"
                    >
                      <CiLogout />
                      <p className="">Logout</p>
                    </Link>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setmanuToggler(false)}>
                <li className="nav_list">
                  <button className="btn">Log In</button>
                </li>
              </NavLink>

              <NavLink to="/register" onClick={() => setmanuToggler(false)}>
                <li className="nav_list">
                  <button className="btn">Register</button>
                </li>
              </NavLink>
            </>
          )}
        </ul>
      </div>

      <div className="toggler flex items-center gap-2 lg:hidden ">
        {logInUser && (
          <>
            <div
              className="flex items-center gap-1 cursor-pointer text-blue   "
              onClick={() => setProfile(!profile)}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden ">
                <img
                  src={`http://localhost:3002/${logInUser.avtarURL}`}
                  alt="user"
                  className=""
                />
              </div>
            </div>

            {profile && (
              <div className="fixed drop-shadow-lg bg-white w-60 h-52 top-16 right-5 duration-[10000ms] ">
                <div className="text-center mt-4">
                  <h1 className="text-xl font-bold font-Nunito">{`${logInUser.firstName} ${logInUser.lastName}`}</h1>
                  <p>{logInUser.email}</p>
                </div>

                <ul className="h-full w-full px-3 ">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 bg-white drop-shadow-lg mt-2 px-2 py-1	cursor-pointer"
                  >
                    <LuUser2 />
                    <p className="">My Profile</p>
                  </Link>
                  <Link
                    to="/update_profile"
                    className="flex items-center gap-2 bg-white drop-shadow-lg mt-2 px-2 py-1	cursor-pointer"
                  >
                    <FiSettings />
                    <p className="">Update Profile</p>
                  </Link>
                  <Link
                    to="/logout"
                    className="flex items-center gap-2 bg-white drop-shadow-lg mt-2 px-2 py-1	cursor-pointer"
                  >
                    <CiLogout />
                    <p className="">Logout</p>
                  </Link>
                </ul>
              </div>
            )}
          </>
        )}

        <div className="lg:hidden">
          {manuToggler ? (
            <MdClose size={22} onClick={() => setmanuToggler(!manuToggler)} />
          ) : (
            <MdMenu size={22} onClick={() => setmanuToggler(!manuToggler)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
