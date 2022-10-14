import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IMG } from '../Api/constant';
import * as API from "../Api/index";
import Modal from 'react-responsive-modal';
import { toast } from 'react-toastify';
const Manufacturers = () => {
  const [tableData, setTableData] = useState([])
  const [loader, setLoader] = useState(false)
  const [openModal, setOpenModal] = useState(false);
  const [menuFect, setMenuFect] = useState("")
  const [sellerId, setSellerId] = useState("")
  const [imageData, setImageData] = useState("")

  console.log("tableData", tableData);

  const getdetailsData = async () =>{
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.menufacther_listing(header)
      console.log("responseMenu", response);
      setTableData(response.data.data)
    } catch (error) {
      
    }
  }
  
  
  const menufactheDelete = async(menuFecId) =>{
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.menufacther_delete(menuFecId , header)
      console.log("response", response);
      if (response.data.success === 1) {
        getdetailsData()
      }
    } catch (error) {
      
    }
  }

  const imageUploading = (e) => {
    let images = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      setImageData(reader.result);
    };
    reader.readAsDataURL(images);
  };

  const openModalSellar = async(sellerId) =>{
    const header = localStorage.getItem("_tokenCode");
    setSellerId(sellerId)
    setOpenModal(true)
    try {
        const response = await API.menufacther_listing_id(sellerId, header)
        console.log("sellerResponse", response);
        setMenuFect(response.data.data.name);
    } catch (error) {
        
    }
}

  const editSellerData = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
        const reqObj = {
            name: menuFect,
            image: imageData,
            id: sellerId,
        }
        console.log("reqObj", reqObj);
        const response = await API.edit_menufact(reqObj, header)
        console.log("response",response);
        if (response.data.success === 1) {
          closeModal()
          getdetailsData()
          toast(response.data.data, {
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
          setMenuFect("")
          setImageData("")
        }
    } catch (error) {
        
    }
  }

  const searchHandaler = async(e) => {
    console.log("e.target.value", e.target.value);
    if (e.target.value === "") {
      getdetailsData()
    }else{
      const header = localStorage.getItem("_tokenCode");
      try {
        const response = await API.menufact_search(e.target.value, header)
        console.log("searchHandaler", response);
        setTableData(response.data.data)
      } catch (error) {
        
      }
    }
    
  }

  const closeModal = () =>{
    setOpenModal(false)
  }
  
  useEffect(() => {
    getdetailsData()
  }, [])
  

  return (
    <>
      <section class="section">
        <div class="page-heading">
          <h3>Manufacturers</h3>
        </div>
        <div class="card">
          <div class="card-header">
            <div className='row'>
                <div className='col-md-7'>
                    <h4 class="card-title">Manufacturers list</h4>
                </div>
                <div className="col-md-4">
                    <div class="form-group position-relative has-icon-right">
                      <input type="text" class="form-control" placeholder="Search here" 
                        onChange={searchHandaler}
                      />
                      <div class="form-control-icon">
                        <i class="bi bi-search"></i>
                      </div>
                    </div>
                </div>
                <div className='col-md-1 text-end'>
                    <Link to="/add-manufacturers" class="btn icon btn-primary">
                        <i class="bi bi-plus"></i>
                    </Link>
                </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div className="col-md-12">
                <div class="table-responsive">
                  <table class="table table-striped mb-0">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>NAME</th>
                        <th>IMAGE</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.length === 0 ? "" : tableData.map((item, index)=> (
                        <tr key={index}>
                          <td class="text-bold-500">{index + 1}</td>
                          <td class="text-bold-500">{item.value} </td>
                          <td>
                            <img className='menufLogo' src={IMG + item.image} alt="" />
                          </td>
                          <td>
                            <div class="buttons">
                              <span onClick={() => openModalSellar(item.id)} class="btn icon btn-primary">
                                <i class="bi bi-pencil"></i>
                              </span>
                              <button onClick={()=>menufactheDelete(item.id)} class="btn icon btn-danger">
                                <i class="bi bi-x"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    <Modal open={openModal} onClose={closeModal}>
        <div class="modal-content editSeller">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Manufacturers</h5>
          </div>
          <div class="modal-body">
            <div class="form-group">
                <label for="basicInput">Name</label>
                <input type="text" onChange={(e)=> setMenuFect(e.target.value)}
                    value={menuFect} 
                    name="firstName" class="form-control"/>
            </div>
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
          <div class="modal-footer">
          <button type="button" 
            class="btn btn-primary" onClick={editSellerData}>Submit</button>
          </div>
        </div>
    </Modal>
    </>
  )
}

export default Manufacturers