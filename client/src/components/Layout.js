import React from "react";
import "../styles/Layout.css";
import { adminMenu, userMenu } from "../data/data";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";
const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  // logout function

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout successfully");
    navigate("/login");
  };

  //=========== doctor menu ============
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid  fa-house",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "fa-solid fa-list",
    },

    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  //=========== doctor menu ============

  // rendering menu
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>DOC APP</h6>
              <hr />
            </div>
            <div className="menu ">
              {SidebarMenu?.map((menu, i) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div className={`menu-item  ${isActive && "active"}`} key={i}>
                    <i className={menu.icon}></i>
                    <NavLink to={menu.path}>{menu.name}</NavLink>
                  </div>
                );
              })}
              <div className="menu-item " onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <NavLink to="/login">Logout</NavLink>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user && user.notification.length}
                  onClick={() => navigate("/notification")}
                >
                  <i className="fa-solid fa-bell"></i>
                </Badge>
                <NavLink to="/profile">{user?.name}</NavLink>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
