import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import * as API from "../Api/index";
const AddMenufect = () => {
    const navigate = useNavigate()
    const [menuFect, setMenuFect] = useState("")

    const [imageData, setImageData] = useState("")

    const imageUploading = (e) => {
        let images = e.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function () {
          setImageData(reader.result);
        };
        reader.readAsDataURL(images);
      };


      const submitHandaler = async () =>{
        const header = localStorage.getItem("_tokenCode");
        try {
            const reQobj ={
                name:menuFect,
                image:imageData
            }
            console.log("reQobj",reQobj);
            const response = await API.add_menufact(reQobj, header)
            console.log("response",response);
            if (response.data.success === 1) {
              toast("Data added successfuly", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "success",
                theme: "colored",
              });
              navigate("/manufacturers-list")
              setMenuFect("")
              setImageData("")
            }
        } catch (error) {
            
        }
      }
    
  return (
    <>
    <section class="section">
      <div class="page-heading">
        <h3>Manufacturers</h3>
      </div>
    
        <div className="row">
        <div className="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Add Manufacturers</h4>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="basicInput">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Name"
                      onChange={(e)=> setMenuFect(e.target.value)}
                      value={menuFect}
                      name="name"
                    />
                  </div>
                  <div className="buttons customBtn mt-3">
                    <button class="btn btn-primary rounded-pill" onClick={submitHandaler}>
                      Submit
                      <div class="icon dripicons dripicons-arrow-right"></div>
                    </button>
                  </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="basicInput"> Upload image</label>
                        <label for="file" className="fileUploade">
                            <div class="icon dripicons dripicons-browser-upload"></div>{" "}
                                Upload image
                            <form encType="multipart/form-data">
                            <input
                                hidden
                                id="file"
                                type="file"
                                onChange={imageUploading}
                                class="image-preview-filepond"
                            />
                            </form>
                        </label>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  )
}

export default AddMenufect