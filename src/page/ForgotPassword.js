import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginImg from "../assets/images/login2.png";
import { useNavigate } from "react-router";
import * as appUtils from "../helpers/appUtils";
import * as API from "../Api/index";
import OTPInput from "otp-input-react";
import logo from "../assets/images/logo.png";
import { toast } from "react-toastify";
const initialDatalog = {
  email: "",
  password: "",
};

const initialDatalogPass = {
  password: "",
  confirmPassword: "",
};

const ForgotPassword = ({ isLogin, setIsLogin }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialDatalog);
  //ERROR-MSGS
  const [errorMsg, setErrorMsg] = useState("");
  const [isMail, setIsMail] = useState(0);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [OTP, setOTP] = useState("");
  const [newPassError, setNewPassError] = useState("");
  const [newPassErrorCon, setNewPassErrorCon] = useState("");
  const [passWordData, setPassWordData] = useState(initialDatalogPass);
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
      };

      const response = await API.forgot_password(reqObj);

      if (response.data.success === 1) {
        setIsMail(1);
      }
    } catch (error) {}
  };

  const otpvarification = async () => {
    try {
      const reqObj = {
        id: formData.email,
        otp: OTP,
      };
      const response = await API.admin_mailVerifi(reqObj);

      if (response.data.success === 1) {
        setIsMail(2);
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

  const newPassHandaler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "password":
        setNewPassError("");
        break;
      case "confirmPassword":
        setNewPassErrorCon("");
        break;
      default:
    }
    setPassWordData({ ...passWordData, [name]: value });
  };

  const validate = () => {
    const { email } = formData;
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

    return flag;
  };

  const newPasswordSet = async () => {
    setLoading(true);
    let flag = validatePass();
    if (!flag) {
      setLoading(false);
      return;
    }
    try {
      const reqObj = {
        emailId: formData.email,
        password: passWordData.password,
        otp: OTP,
      };

      const response = await API.reset_password_buyer(reqObj);

      if (response.data.success === 1) {
        navigate("/");
        toast(response.data.msg, {
          position: "top-right",
          autoClose: 5000,
          type: "success",
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

  //VALIDATE-INPUT
  const validatePass = () => {
    const { password, confirmPassword } = passWordData;
    let flag = true;

    // ? password
    if (password) {
      if (password.length < 8) {
        setNewPassError({
          field: "password",
          message: "Your password is too short. It needs to be 8+ characters",
        });
        flag = false;
      }
      if (password.length > 8) {
        setNewPassError({
          field: "password",
          message: "",
        });
        flag = true;
      }
    } else {
      setNewPassError({
        field: "password",
        message: "Please enter your password.",
      });
      flag = false;
    }

    // ? confirmPassword

    // ? confirmPassword
    if (password === "" || password !== confirmPassword) {
      setNewPassErrorCon({
        field: "confirmPassword",
        message: "Confirm password does not match with your password",
      });
      flag = false;
    } else {
      setNewPassErrorCon({
        field: "confirmPassword",
        message: "",
      });
      flag = true;
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
              <h3>Forgot password</h3>
              {isMail === 0 ? (
                <>
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
                  <button className="loginbtn" onClick={loginSubmit}>
                    <span>Submit</span>
                  </button>
                </>
              ) : isMail === 1 ? (
                <>
                  <div class="form-group position-relative has-icon-left mb-3">
                    <OTPInput
                      value={OTP}
                      onChange={setOTP}
                      autoFocus
                      OTPLength={6}
                      otpType="number"
                      disabled={false}
                      className="otpInput"
                    />
                  </div>
                  <button className="loginbtn" onClick={otpvarification}>
                    <span>Submit</span>
                  </button>
                </>
              ) : (
                <>
                  <div class="form-group position-relative has-icon-left mb-3">
                    <input
                      onChange={newPassHandaler}
                      type="password"
                      name="password"
                      value={passWordData.password}
                      class="form-control mb-3"
                      placeholder="Enter password"
                    />
                    {newPassError.field === "password" && (
                      <p className="formErrorAlrt">{newPassError.message}</p>
                    )}

                    <input
                      onChange={newPassHandaler}
                      name="confirmPassword"
                      value={passWordData.confirmPassword}
                      type="password"
                      class="form-control"
                      placeholder="Confirm password"
                    />
                    {newPassErrorCon.field === "confirmPassword" && (
                      <p className="formErrorAlrt">{newPassErrorCon.message}</p>
                    )}
                  </div>
                  <button className="loginbtn" onClick={newPasswordSet}>
                    <span>Submit</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
