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
const AppRouter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setdarkMode] = useState(localStorage.getItem("darkThem"));

  const [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage.getItem("isLoginCheck"))
  );

  // ? MENU TOGGLE HIDE AND SHOW
  const ToggleSidebar = () => {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  };

  return (
    <div className={darkMode ? "theme-dark" : ""}>
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
                />
              </header>
              <Routes>
                <Route path="/" element={<Base />} />
                <Route path="/dashboard" element={<Base />} />
                <Route path="/form" element={<Form />} />
                <Route path="/table" element={<Table />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/add-manufacturers" element={<AddMenufect />} />
                <Route path="/change-password" element={<ChangesPassword />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route
              path="/"
              element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}
            />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
