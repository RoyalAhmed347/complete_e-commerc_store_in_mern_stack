import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { BiTachometer } from "react-icons/bi";
import { HiTemplate } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import { RiContactsLine } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

import { LuUser2 } from "react-icons/lu";
import { FiSettings } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { FaOpencart } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";

import { IoLogOutSharp } from "react-icons/io5";
import { useAdminAuthHook } from "../../context/AdminAuthContext";

const Sidebar = ({ children }) => {
  const [openSidebar, setopenSidebar] = useState(false);
  const [profile, setprofile] = useState(false);

  const { isLoading, cruntAdmin } = useAdminAuthHook();

  const menu = [
    {
      title: "Deshbord",
      path: "deshbord",
      icon: <BiTachometer size={22} className="font-medium " />,
    },
    {
      title: "Products",
      path: "products",
      icon: <HiTemplate size={22} className="font-medium" />,
    },
    {
      title: "Users",
      path: "users",
      icon: <FaUsers size={22} className="font-medium" />,
    },
    {
      title: "Orders",
      path: "orders",
      icon: <FaOpencart size={22} className="font-medium" />,
    },
    {
      title: "Contects",
      path: "contects",
      icon: <LuMessagesSquare size={22} className="font-medium" />,
    },
    {
      title: "Logout",
      path: "logout",
      icon: <IoLogOutSharp size={22} className="font-medium" />,
    },
  ];

  return (
    <>
      {isLoading ? null : (
        <div className="container">
          <div className="w-full h-screen flex bg-[#F0F4F8]   ">
            <aside
              className={`h-full w-[300px]  drop-shadow-lg bg-white rounded-md duration-300 absolute  md:left-0  md:relative  ${
                !openSidebar && "w-[55px] -left-full duration-300  "
              } `}
            >
              <Link
                to="/admin/deshbord"
                className="py-5 px-2 flex items-center justify-between duration-300"
              >
                {openSidebar ? (
                  <img
                    src="..\assets\images\logo.png"
                    className="h-[40px] "
                    alt="logo"
                  />
                ) : (
                  <img
                    src="..\assets\images\sum_logo.jpg"
                    className="w-[40px]"
                    alt="logo"
                  />
                )}

                <FiMenu
                  size={22}
                  onClick={() => setopenSidebar(!openSidebar)}
                  className="cursor-pointer text-black  md:hidden"
                />
              </Link>
              <div className="px-2 w-full">
                {menu.map((elem, index) => {
                  return (
                    <NavLink
                      className={`w-ful my-3 drop-shadow-lg bg-white text-gray-600 py-3 px-2 rounded-lg flex  aria-[current=page]:text-white aria-[current=page]:bg-blue hover:bg-zinc-400 hover:text-white  duration-300 `}
                      key={index}
                      to={elem.path}
                    >
                      <span className="mr-2">{elem.icon}</span>
                      <span
                        className={`font-medium rotate-360 duration-300 ${
                          !openSidebar && "scale-0   "
                        }  `}
                      >
                        {elem.title}
                      </span>
                    </NavLink>
                  );
                })}
              </div>
            </aside>
            <main className="w-full">
              <nav className="bg-white drop-shadow-lg w-full px-3 py-3 flex justify-between items-center">
                <FiMenu
                  size={22}
                  onClick={() => setopenSidebar(!openSidebar)}
                  className="cursor-pointer text-blue"
                />

                <div
                  className="flex items-center gap-1 cursor-pointer text-blue "
                  onClick={() => setprofile(!profile)}
                >
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img
                      src={`http://localhost:3002${cruntAdmin.avtarURL}`}
                      alt="user"
                      className="w-10"
                    />
                  </div>
                  <p>{cruntAdmin.firstName + " " + cruntAdmin.lastName}</p>
                  {profile ? <FaAngleUp /> : <FaAngleDown />}
                </div>
                {profile && (
                  <div className="fixed drop-shadow-lg bg-white w-60 h-52 top-14 right-2 duration-[10000ms]  ">
                    <div className="text-center mt-4">
                      <h1 className="text-xl font-bold font-Nunito">
                        {cruntAdmin.firstName + " " + cruntAdmin.lastName}
                      </h1>
                      <p>{cruntAdmin.email}</p>
                    </div>

                    <ul className="h-full w-full px-3 ">
                      <Link
                        to="/admin/profile"
                        className="flex items-center gap-2 bg-white drop-shadow-lg mt-2 px-2 py-1	cursor-pointer"
                      >
                        <LuUser2 />
                        <p className="">My Profile</p>
                      </Link>
                      <Link
                        to="/admin/update_profile"
                        className="flex items-center gap-2 bg-white drop-shadow-lg mt-2 px-2 py-1	cursor-pointer"
                      >
                        <FiSettings />
                        <p className="">Update Profile</p>
                      </Link>
                      <Link
                        to="/admin/logout"
                        className="flex items-center gap-2 bg-white drop-shadow-lg mt-2 px-2 py-1	cursor-pointer"
                      >
                        <CiLogout />
                        <p className="">Logout</p>
                      </Link>
                    </ul>
                  </div>
                )}
              </nav>
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

// {openSidebar && (
//   <div className="py-1 px-5">
//     {menu.map((elem, index) => {
//       return (
//         <div className="w-ful my-3 drop-shadow-lg " key={index}>
//           <NavLink
//             to={elem.path}
//             className="w-full items-center rounded-md gap-2 py-2 px-3 flex justify-start text-gray-600  aria-[current=page]:text-white aria-[current=page]:bg-blue hover:bg-zinc-400 hover:text-white "
//           >
//             {elem.icon}
//             <p className="text-lg font-medium">{elem.title}</p>
//           </NavLink>
//         </div>
//       );
//     })}
