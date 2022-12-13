import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import { SOCEKT, URL } from "../Api/constant";
const Header = ({ ToggleSidebar, setIsLogin }) => {
  const [notification, setNotification] = useState([]);
  const navigate = useNavigate();
  const socket = io(SOCEKT);
  const logoutbtn = () => {
    localStorage.removeItem("isLoginCheck");
    setIsLogin(localStorage.removeItem("isLoginCheck"));
    localStorage.removeItem("_userId");
    localStorage.removeItem("_tokenCode");
    if (localStorage.removeItem("isLoginCheck") === undefined) {
      navigate("/");
    }
  };

  const notificationrender = () => {
    socket.emit("notification", {
      id: localStorage.getItem("_userId"),
    });
  };
  useEffect(() => {
    socket.on("receiveNotification", (data) => {
      setNotification(data.notification);
    });
    notificationrender();
  }, []);

  return (
    <div className="header_sec">
      <div className="row">
        <div className="col-lg-1 text-center">
          <span className="fa-fw select-all fas togale" onClick={ToggleSidebar}>
            
          </span>
        </div>
        <div className="col-lg-5">
          <div class="form-group position-relative has-icon-right d-none">
            <input type="text" class="form-control" placeholder="Search here" />
            <div class="form-control-icon">
              <i class="bi bi-search"></i>
            </div>
          </div>
        </div>
        <div className="col-lg-4"></div>
        <div className="col-lg-1 dropDwon notification">
          <div class="buttons">
            <ul>
              <li class="subdrop">
                <Link to="/" class="btn icon btn-primary rounded-pill notifi">
                  <i class="bi bi-bell"></i>
                  <span className="notiFicationCount">
                    {notification.length}
                  </span>
                </Link>
                <ul className="subDropDwn">
                  <h4 className="notifiHeading">Notifications</h4>
                  {notification.map((item, index) => (
                    <>
                      <hr></hr>
                      <li>
                        <Link to="#">{item.message}</Link>
                      </li>
                    </>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-1 dropDwon">
          <ul>
            <li class="subdrop">
              <div class="avatar me-3">
                <img src="assets/images/faces/2.jpg" alt="" srcset="" />
              </div>
              <ul className="subDropDwn">
                <li>
                  <Link to="/profile">
                    <i class="icon dripicons dripicons-user"></i> Profile
                  </Link>
                </li>
                <hr></hr>
                <li>
                  <Link to="/change-password">
                    <i class="bi bi-key"></i> Change Password
                  </Link>
                </li>
                <hr></hr>
                <li>
                  <Link to="/dashboard">
                    <i class="icon dripicons dripicons-user-group"></i> View
                    user
                  </Link>
                </li>
                <span className="logout" onClick={logoutbtn}>
                  <div class="icon dripicons dripicons-exit"></div>
                  Logout
                </span>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
