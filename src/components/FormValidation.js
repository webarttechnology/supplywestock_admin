import { Field, Form, Formik, ErrorMessage } from "formik";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
const initialvalue = {
  name: "",
  email: "",
  username: "",
  password: "",
};
// ? validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  username: Yup.string().required("Please enter your username"),
  password: Yup.string().required("Please enter your password").min(8).max(10),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
});

const FormValidation = () => {
  // ? ONCHANGES HANDALER
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      console.log("value", value);
    }
  };

  // ? SUBMIT BUTTON
  const handelSubmit = (values) => {
    toast("Data added successfuly", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: "success",
      theme: "dark",
    });
  };

  return (
    <section className="section">
      <div className="page-heading">
        <h3>Form</h3>
      </div>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Form Validation</h4>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 customBtn">
              <Formik
                initialValues={initialvalue}
                onSubmit={handelSubmit}
                validationSchema={validationSchema}
              >
                {({ errors }) => (
                  <Form onChange={handleOnChange}>
                    <div className="form-group">
                      <label for="basicInput">
                        Name <span className="requerid">*</span>
                      </label>
                      <Field
                        type="text"
                        name="name"
                        className={
                          errors.name
                            ? "form-control errorInput"
                            : "form-control"
                        }
                        placeholder="Name"
                      />
                      <p className="validError">
                        <ErrorMessage name="name" />
                      </p>
                    </div>
                    <div className="form-group">
                      <label for="basicInput">
                        email <span className="requerid">*</span>
                      </label>
                      <Field
                        type="text"
                        name="email"
                        className={
                          errors.email
                            ? "form-control errorInput"
                            : "form-control"
                        }
                        placeholder="email"
                      />
                      <p className="validError">
                        <ErrorMessage name="email" />
                      </p>
                    </div>
                    <div className="form-group">
                      <label for="basicInput">
                        User Name <span className="requerid">*</span>
                      </label>
                      <Field
                        type="text"
                        className={
                          errors.username
                            ? "form-control errorInput"
                            : "form-control"
                        }
                        placeholder="user name"
                        name="username"
                      />
                      <p className="validError">
                        <ErrorMessage name="username" />
                      </p>
                    </div>
                    <div className="form-group">
                      <label for="basicInput">
                        password <span className="requerid">*</span>
                      </label>
                      <Field
                        type="password"
                        className={
                          errors.password
                            ? "form-control errorInput"
                            : "form-control"
                        }
                        placeholder="password"
                        name="password"
                      />
                      <p className="validError">
                        <ErrorMessage name="password" />
                      </p>
                    </div>
                    <button
                      className="btn btn-primary rounded-pill"
                      type="submit"
                    >
                      Submit
                    </button>
                    <ToastContainer />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormValidation;
