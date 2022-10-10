import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { IMG } from '../Api/constant';
import { cuntryData } from '../helpers/commonData';
import Modal from 'react-responsive-modal';
import * as API from "../Api/index";
import { toast } from 'react-toastify';
const initialData = {
    firstName:"",
    lastName:"",
    emailId:"",
    mobileNo:"",
  }
  
const MenageSallerData = () => {
    const [openModal, setOpenModal] = useState(false);
    const [tableData, setTableData] = useState([])
    const [sellerId, setSellerId] = useState("")
    const [formData, setFormData] = useState(initialData)
    const [mobileData, setMobileData] = useState("")
    const [mobileDataRaw, setMobileDataRaw] = useState("")
  
    const getdetailsData = async () =>{
      const header = localStorage.getItem("_tokenCode");
      try {
        const response = await API.showAll_sellerData(header)
        setTableData(response.data.data)
      } catch (error) {
        
      }
    }

    const normalizeInput = (value, previousValue) => {
        if (!value) return value;
        const currentValue = value.replace(/[^\d]/g, "");
        const cvLength = currentValue.length;
        if (!previousValue || value.length > previousValue.length) {
          if (cvLength < 4) return currentValue;
          if (cvLength < 7)
            return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
          return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
            3,
            6
          )}-${currentValue.slice(6, 10)}`;
        }
    };
    

    const handalerChnages = (e) => {
        const { name, value } = e.target;  
        if (name === "mobileNo") {
            const dataFormt = normalizeInput(value);
            setMobileData(dataFormt)
            setMobileDataRaw(dataFormt)
        }
        setFormData({ ...formData, [name]: value });
    } 

    const openModalSellar = async(sellerId) =>{
        const header = localStorage.getItem("_tokenCode");
        setSellerId(sellerId)
        setOpenModal(true)
        try {
            const response = await API.manufacturer_saller(sellerId, header)
            console.log("sellerResponse", response);
            setFormData(response.data.data);
            setMobileData(response.data.data.mobileNo)
        } catch (error) {
            
        }
    }

    const editSellerData = async () =>{
        const header = localStorage.getItem("_tokenCode");
        try {
            const reqObj = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                mobileNo: mobileDataRaw ? `+1${mobileDataRaw}` : mobileData,
                id: sellerId,
            }
            console.log("reqObj", reqObj);
            const response = await API.user_update_seller(reqObj,header)
            console.log("response", response);
            if (response.data.success === 1) {
                getdetailsData()
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
                closeModal()
            }
        } catch (error) {
            
        }
    }

    const deleteManageSaller = async(sellerId) =>{
        const header = localStorage.getItem("_tokenCode");
        try {
            const response = await API.delete_saller(sellerId, header)
            console.log("response", response);
            if (response.data.sucess === 1) {
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
                <h3>Manage Saller Data</h3>
            </div>
            <div class="card">
                <div class="card-header">
                <div className='row'>
                    <div className='col-md-10'>
                        <h4 class="card-title">Manage Saller Data</h4>
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
                                            <th>FIRST NAME</th>
                                            <th>LAST NAME</th>
                                            <th>EMAIL ID</th>
                                            <th>MOBILE NO.</th>
                                            {/* <th>MANUFACTURER</th> */}
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((item, index)=>(
                                            <tr>
                                                <td class="text-bold-500">{index + 1}</td>
                                                <td class="text-bold-500">{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td class="text-bold-500">{item.emailId}</td>
                                                <td>{item.mobileNo}</td>
                                                <td>
                                                    <div class="buttons">
                                                        <span onClick={() => openModalSellar(item._id)} class="btn icon btn-primary">
                                                            <i class="bi bi-pencil"></i>
                                                        </span>
                                                        <span onClick={()=> deleteManageSaller(item._id)} class="btn icon btn-danger">
                                                            <i class="bi bi-x"></i>
                                                        </span>
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
                <h5 class="modal-title" id="exampleModalLabel">Edit Seller Data</h5>
              </div>
              <div class="modal-body">
                <div class="form-group">
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

export default MenageSallerData