import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Features/UserSlice.js";
import logo from "../Images/logo-t.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    await new Promise((resolve) => setTimeout(resolve, 100));
    navigate("/");
  };

  return (
    <Navbar
      color="primary"
      dark
      expand="md"
      className="shadow-lg py-3 px-5"
      style={{ position: "sticky", top: 0, zIndex: 10 }}
    >
      {/* الشعار */}
      <NavbarBrand className="d-flex align-items-center" href="/">
        <img
          src={logo}
          alt="Logo"
          style={{ height: "40px", marginRight: "10px" }}
        />
        <span className="text-white fw-bold">ShareBook</span>
      </NavbarBrand>

      {/* الروابط */}
      <Nav className="ml-auto d-flex align-items-center">
        <NavItem className="mx-2">
          <Link to="/" className="text-white text-decoration-none hover-text">
            Home
          </Link>
        </NavItem>
        <NavItem className="mx-2">
          <Link
            to="/login"
            className="text-white text-decoration-none hover-text"
          >
            Login
          </Link>
        </NavItem>
        <NavItem className="mx-2">
          <Link
            to="/profile"
            className="text-white text-decoration-none hover-text"
          >
            Profile
          </Link>
        </NavItem>
        <NavItem className="mx-2">
          <button
            onClick={handleLogout}
            className="btn btn-outline-light btn-sm px-3"
          >
            Logout
          </button>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Header;
