import React, { useEffect, useState } from 'react'
import Modal from 'react-responsive-modal';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import * as API from "../Api/index";
const ManageBuyerEnquiry = ({setIsLogin}) => {
   const navigate = useNavigate()
    const [tableData, setTableData] = useState([])
    const [openModal, setOpenModal] = useState(false);

  const getdetailsData = async () =>{
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.enquriys_list(header)
      console.log("responsewwww", response);
      if (response.data.success === 2) {
        navigate("/")
        localStorage.removeItem("isLoginCheck");
        setIsLogin(localStorage.removeItem("isLoginCheck"));
        localStorage.removeItem("_userId")
        localStorage.removeItem("_tokenCode")
      }
      setTableData(response.data.data)
    } catch (error) {
      
    }
  }

  const approveAdmin = async (enquId) =>{
    const header = localStorage.getItem("_tokenCode");
    try {
        const reqObj = {
            userid:localStorage.getItem("_userId"),
            id:enquId
        }
        const response = await API.enquriys_approve(reqObj, header)
        console.log("response", response);
        if (response.data.success === 1) {
            getdetailsData()
            toast(response.data.msg, {
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
        }
    } catch (error) {
        
    }
  }

const openModalSellar = () => {
    setOpenModal(true)
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
                <h3>Manage Buyer</h3>
            </div>
            <div class="card">
                <div class="card-header">
                <div className='row'>
                    <div className='col-md-10'>
                        <h4 class="card-title">Manage Buyer Enquiry</h4>
                    </div>
                    <div className='col-md-2 text-end'>
                        {/* <Link to="/add-manufacturers" class="btn icon btn-primary">
                            <i class="bi bi-plus"></i>
                        </Link> */}
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
                            <th>Manufacturer</th>
                            <th>Quantities</th>
                            <th>Size</th>
                            <th>Product details</th>
                            <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((item, index)=>(
                                <tr>
                                    <td class="text-bold-500">{index + 1}</td>
                                    <td class="text-bold-500">{item.manufacturer.name}</td>
                                    <td>{item.quantities}</td>
                                    <td class="text-bold-500">{item.size}</td>
                                    <td>{item.product_des}</td>
                                    <td>
                                        <div class="buttons">
                                            {item.activeAdmin === "0" ? (
                                                <button onClick={() => approveAdmin(item._id)} class="btn icon btn-primary">
                                                    Approve
                                                </button>
                                            ):(
                                                <button class="btn icon btn-success">
                                                    Approved
                                                </button>
                                            )}
                                            
                                            <a href="#" class="btn icon btn-danger">
                                                <i class="bi bi-x"></i>
                                            </a>
                                            {item.activeAdmin === "0" ? (
                                                ""
                                            ):(
                                                <button class="btn btn-primary icon" onClick={() => openModalSellar()}>
                                                    Order generate
                                                </button>
                                            )}
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
                <h5 class="modal-title" id="exampleModalLabel">Order generate</h5>
              </div>
              <div class="modal-body">
                {/* <div class="form-group">
                    <label for="basicInput">First Name</label>
                    <input type="text" onChange={handalerChnages} 
                        value={formData.firstName} 
                        name="firstName" class="form-control" placeholder="First Name"/>
                </div>
                <div class="form-group">
                    <label for="basicInput">Last Name</label>
                    <input type="text" class="form-control" 
                        placeholder="Last Name" 
                        onChange={handalerChnages} 
                        value={formData.lastName}
                        name="lastName" />
                </div>
                <div class="form-group">
                    <label for="basicInput">Email id</label>
                    <input type="text" class="form-control" readOnly placeholder="Email Id" 
                        onChange={handalerChnages} 
                        value={formData.emailId}
                        name="emailId" 
                    />
                </div>
                <div class="form-group">
                    <label for="basicInput">Mobile Number</label>
                    <div className="mobileNumber editPro mt-2">
                        <select className="mobileCode">
                            {cuntryData.map((item, index) => (
                                <>
                                  {item.code === "US" ? (
                                    <option
                                        name="category"
                                        key={item.name}
                                        value={item.dial_code}
                                    >
                                        { item.dial_code}
                                    </option>
                                    ) : (
                                    ""
                                    )}
                                </>
                            ))}
                        </select>
                        <input type="text" 
                            className="form-control" 
                            placeholder="Mobile No" 
                            onChange={handalerChnages} 
                            value={mobileData}
                            name="mobileNo"
                        />
                    </div>
                </div> */}
              </div>
              <div class="modal-footer">
              {/* <button type="button" 
                class="btn btn-primary" onClick={editSellerData}>Submit</button> */}
              </div>
            </div>
        </Modal>
    </>
  )
}

export default ManageBuyerEnquiry