import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import FormValidation from "./FormValidation";
const Form = () => {
  const [file, setFile] = useState();

  // ?===== toster message ========
  const notify = () =>
    toast("Wow so easy!", {
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

  // ?======= imageUploader ============
  const imageUploader = (e) => {
    console.log("Images", e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  // ? ==== Images hide =====
  const imageHide = () => {
    setFile(false);
  };

  return (
    <section class="section">
      <div class="page-heading">
        <h3>Form</h3>
      </div>
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Basic Inputs</h4>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="basicInput">Name</label>
                <input type="text" class="form-control" placeholder="Name" />
              </div>
              <div class="form-group">
                <label for="helpInputTop">Validation Input</label>
                <input
                  type="text"
                  class="form-control errorInput"
                  placeholder="Validation input"
                />
              </div>
              {/* <div class="form-group">
                <label for="helperText">With Helper Text</label>
                <input type="text" class="form-control" placeholder="Name" />
              </div> */}
              <div class="form-check form-check-success mt-3">
                <input
                  class="form-check-input"
                  type="radio"
                  name="Success"
                  checked="checked"
                />
                <label class="form-check-label" for="Primary">
                  Primary
                </label>
              </div>
              <div class="form-check form-switch mt-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                  checked="checked"
                />
                <label class="form-check-label" for="flexSwitchCheckChecked">
                  Checked switch checkbox input
                </label>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label for="file" className="fileUploade">
                    <div class="icon dripicons dripicons-browser-upload"></div>{" "}
                    Upload image
                    <form encType="multipart/form-data">
                      <input
                        hidden
                        id="file"
                        type="file"
                        onChange={imageUploader}
                        class="image-preview-filepond"
                      />
                    </form>
                  </label>
                </div>
                <div className="col-md-6">
                  {file ? (
                    <div className="imagesPrivew">
                      <span
                        onClick={imageHide}
                        className="icon dripicons dripicons-cross"
                      ></span>
                      <img src={file} alt="" />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="disabledInput">Disabled Input</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Disabled Text"
                  disabled={true}
                />
              </div>
              <div class="form-group">
                <label for="disabledInput">Readonly Input</label>
                <input
                  type="text"
                  class="form-control"
                  id="readonlyInput"
                  readonly="readonly"
                  value="You can't update me :P"
                />
              </div>
              <div class="form-floating mb-3">
                <textarea
                  class="form-control"
                  placeholder="Leave a comment here"
                  rows="10"
                  cols="5"
                ></textarea>
                <label for="floatingTextarea">Comments</label>
              </div>

              <fieldset class="form-group">
                <label for="helperText">Select Input</label>
                <select class="form-control">
                  <option>IT</option>
                  <option>Blade Runner</option>
                  <option>Thor Ragnarok</option>
                </select>
              </fieldset>
              <div className="buttons customBtn mt-3">
                <button class="btn btn-primary rounded-pill" onClick={notify}>
                  Submit
                  <div class="icon dripicons dripicons-arrow-right"></div>
                </button>
                <ToastContainer draggable />
              </div>
            </div>
          </div>
        </div>
      </div>
      <FormValidation />
    </section>
  );
};

export default Form;
