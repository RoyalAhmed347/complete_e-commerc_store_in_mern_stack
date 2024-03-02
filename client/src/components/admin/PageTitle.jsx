import React from "react";
import { Link, useLocation } from "react-router-dom";

const PageTitle = ({ menu, sub_menu }) => {
  const location = useLocation();
  const { pathname } = location;

  const Menus = pathname.split("/");
  Menus.shift();
  Menus.shift();

  return (
    <>
      <div className="bg-white p-2">
        <h1 className="font-medium text-2xl text-blue capitalize">
          {Menus[0]}
        </h1>
        <p className="font-medium text-gray-600">
          <Link to="/admin">Home / </Link>
          {Menus.map((elem, index) => {
            return (
              <Link className="capitalize text-gray-400" to={`/admin/${elem}`} key={index}>
                {elem}
              </Link>
            );
          })}
        </p>
      </div>
    </>
  );
};

export default PageTitle;
