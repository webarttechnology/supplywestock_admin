import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Base from "../components/Base";
import Form from "../components/Form";
import SidBar from "../components/SidBar";
import Header from "../components/Header";
import Table from "../components/Table";
import Login from "../page/Login";
import Profile from "../page/Profile";
import ChangesPassword from "../page/ChangesPassword";
import AddMenufect from "../page/AddMenufect";
import ForgotPassword from "../page/ForgotPassword";
import Manufacturers from "../page/Manufacturers";
import MenageSallerData from "../page/MenageSallerData";
import MenageBuyerData from "../page/MenageBuyerData";
import ManageBuyerEnquiry from "../page/ManageBuyerEnquiry";
import { ToastContainer } from "react-toastify";
import Message from "../page/Message";
import ManageOrderData from "../page/ManageOrderData";
import AdditionCharges from "../page/AdditionCharges";
import { io } from "socket.io-client";
import { SOCEKT, URL } from "../Api/constant";
import { useEffect } from "react";
const AppRouter = () => {
  const [notification, setNotification] = useState([]);
  const socket = io(SOCEKT);
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setdarkMode] = useState(localStorage.getItem("darkThem"));

  const [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage.getItem("isLoginCheck"))
  );

  // ? MENU TOGGLE HIDE AND SHOW
  const ToggleSidebar = () => {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
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
    <div className={darkMode ? "theme-dark" : ""}>
      <ToastContainer />
      <BrowserRouter>
        {isLogin ? (
          <>
            <SidBar
              isOpen={isOpen}
              darkMode={darkMode}
              setdarkMode={setdarkMode}
            />
            <div id="main">
              <header class="mb-3">
                <Header
                  isLogin={isLogin}
                  setIsLogin={setIsLogin}
                  ToggleSidebar={ToggleSidebar}
                  notification={notification}
                />
              </header>
              <Routes>
                <Route path="/" element={<Base setIsLogin={setIsLogin} />} />
                <Route
                  path="/dashboard"
                  element={<Base setIsLogin={setIsLogin} />}
                />
                <Route path="/form" element={<Form />} />
                <Route path="/table" element={<Table />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/add-manufacturers" element={<AddMenufect />} />
                <Route path="/manufacturers-list" element={<Manufacturers />} />
                <Route path="/manage-seller" element={<MenageSallerData />} />
                <Route path="/manage-buyer" element={<MenageBuyerData />} />
                <Route path="/message" element={<Message />} />
                <Route
                  path="/manage-buyer-enquiry"
                  element={<ManageBuyerEnquiry setIsLogin={setIsLogin} />}
                />
                <Route path="/change-password" element={<ChangesPassword />} />
                <Route path="/manage-order" element={<ManageOrderData />} />
                <Route path="/addition-charges" element={<AdditionCharges />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}
            />
            <Route
              path="/forgot-password"
              element={
                <ForgotPassword isLogin={isLogin} setIsLogin={setIsLogin} />
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
