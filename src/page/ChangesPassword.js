import React, { useState } from "react";
import { toast } from "react-toastify";
import * as API from "../Api/index";
const initialDatalogPass = {
  password: "",
  confirmPassword: "",
};
const ChangesPassword = () => {
  const [passWordData, setPassWordData] = useState(initialDatalogPass);
  const [newPassError, setNewPassError] = useState("");
  const [newPassErrorCon, setNewPassErrorCon] = useState("");
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

  const changePassword = async () => {
    let flag = validatePass();
    if (!flag) {
      return;
    }
    const header = localStorage.getItem("_tokenCode");
    try {
      const reqObj = {
        password: passWordData.password,
        id: localStorage.getItem("_userId"),
      };
      const response = await API.changesPassword_buyer(reqObj, header);

      if (response.data.success === 1) {
        toast(response.data.message, {
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
    <>
      <section class="section">
        <div class="page-heading">
          <h3>Change Password</h3>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="basicInput">Password</label>
                      <input
                        class="form-control"
                        placeholder="Password"
                        onChange={newPassHandaler}
                        type="password"
                        name="password"
                        value={passWordData.password}
                      />
                      {newPassError.field === "password" && (
                        <p className="formErrorAlrt">{newPassError.message}</p>
                      )}
                    </div>
                    <div className="buttons customBtn mt-3">
                      <button
                        class="btn btn-primary rounded-pill"
                        onClick={changePassword}
                      >
                        Submit
                        <div class="icon dripicons dripicons-arrow-right"></div>
                      </button>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="disabledInput">Confirm Password</label>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Confirm Password"
                        onChange={newPassHandaler}
                        name="confirmPassword"
                        value={passWordData.confirmPassword}
                      />
                      {newPassErrorCon.field === "confirmPassword" && (
                        <p className="formErrorAlrt mt-3">
                          {newPassErrorCon.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChangesPassword;
