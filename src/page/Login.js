import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginImg from "../assets/images/login2.png";
import { useNavigate } from "react-router";
import * as appUtils from "../helpers/appUtils";
import * as API from "../Api/index";
import logo from "../assets/images/logo.png";
import { toast } from "react-toastify";
const initialDatalog = {
  email: "",
  password: "",
};

const Login = ({ isLogin, setIsLogin }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialDatalog);
  //ERROR-MSGS
  const [errorMsg, setErrorMsg] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const navigate = useNavigate();

  //? LOGIN SUBMIT BUTTON
  const loginSubmit = async () => {
    setLoading(true);
    let flag = validate();
    if (!flag) {
      setLoading(false);
      return;
    }

    try {
      const reqObj = {
        emailId: formData.email,
        password: formData.password,
      };

      const response = await API.admin_login(reqObj);

      if (response.data.success === 1) {
        localStorage.setItem("isLoginCheck", true);
        localStorage.setItem("_userId", response.data.data.id);
        const headerObj = {
          Authorization: `Bearer ${response.data.token_code}`,
        };
        localStorage.setItem("_tokenCode", JSON.stringify(headerObj));
        setIsLogin(!isLogin);
        navigate("/dashboard");
      } else {
        toast(response.data.msg, {
          position: "top-right",
          autoClose: 5000,
          type: "error",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {}
  };

  // ? HANDALER
  const handalerChnages = (e) => {
    const { name, value } = e.target;
    setLoading(false);
    switch (name) {
      case "email":
        setErrorEmail("");
        setErrorMsg(false);
        break;
      case "password":
        setErrorPassword("");
        break;
      default:
    }
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const { email, password } = formData;
    let flag = true;

    let validateEmail = appUtils.validateEmail(email);
    if (validateEmail === 1) {
      setErrorEmail({
        field: "email",
        message: "",
      });
    }
    if (!(validateEmail === 1)) {
      let msg = "";
      if (validateEmail === 0) {
        msg = "Please enter your email address.";
      } else {
        msg = "That doesn't look like an email address.";
      }
      setErrorEmail({
        field: "email",
        message: msg,
      });
      flag = false;
    }

    // ? password
    if (password) {
      if (password.length < 8) {
        setErrorPassword({
          field: "password",
          message: "Your password is too short. It needs to be 8+ characters",
        });
        flag = false;
      }
      if (password.length > 8) {
        setErrorPassword({
          field: "password",
          message: "",
        });
        flag = true;
      }
    } else {
      setErrorPassword({
        field: "password",
        message: "Please enter your password.",
      });
      flag = false;
    }

    return flag;
  };

  return (
    <div className="loginBg">
      <div className="loginContaint">
        <div className="row">
          <div className="col-md-7 text-center">
            <img src={loginImg} alt="" />
          </div>
          <div className="col-md-5 text-center">
            <img src={logo} alt="" className="w-50 loginLogo" />
            <div className="loginSec">
              <h3>login</h3>
              <div class="form-group position-relative has-icon-left mb-3">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handalerChnages}
                  name="email"
                />
                <div class="form-control-icon">
                  <i class="bi bi-person"></i>
                </div>
                {errorEmail.field === "email" && (
                  <p className="formErrorAlrt">{errorEmail.message}</p>
                )}
              </div>
              <div class="form-group position-relative has-icon-left">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handalerChnages}
                  name="password"
                />
                <div class="form-control-icon">
                  <i class="bi bi-lock"></i>
                </div>
                {errorPassword.field === "password" && (
                  <p className="formErrorAlrt">{errorPassword.message}</p>
                )}
              </div>
              <Link to="/forgot-password">Forgot password ?</Link>
              <button className="loginbtn" onClick={loginSubmit}>
                <span>Login Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
