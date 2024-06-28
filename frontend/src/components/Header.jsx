import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <Link className="logo" to="/">
        Support Desk
      </Link>
      <ul className="">
        <li className="">
          <Link className="" to="/login">
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li className="">
          <Link className="" to="/register">
            <FaUser /> Register
          </Link>
        </li>
        {/* <li className="">
          <Link className="" to="/logout">
            <FaSignOutAlt /> Logout
          </Link>
        </li> */}
      </ul>
    </header>
  );
};

export default Header;
