import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IMG } from '../Api/constant';
import * as API from "../Api/index";
import Modal from 'react-responsive-modal';
import { toast } from 'react-toastify';
const initialData = {
  manufacturerId:"",
  product_des:"",
  unitPrice:"",
  quantities:"",
  sellerId:""
}
const ManageOrderData = () => {
  const [tableData, setTableData] = useState([])
  const [formData, setFormData] = useState(initialData)
  const [openModal, setOpenModal] = useState(false);
  const [menuFect, setMenuFect] = useState("")
  const [buyerId, setBuyerId] = useState("")
  const [enquerisId, setEnquerisId] = useState("")
  const [sellerList, setSellerList] = useState([])

  const getdetailsData = async () =>{
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.order_data_list(header)
      console.log("responseOrder", response);
      setTableData(response.data.data)
    } catch (error) {
      
    }
  }

  const handalerChnages = (e) =>{
    const { name, value } = e.target;  
      setFormData({ ...formData, [name]: value });
  }
  
  
  const menufactheDelete = async(menuFecId) =>{
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.order_delete(menuFecId , header)
      console.log("response", response);
      if (response.data.success === 1) {
        getdetailsData()
      }
    } catch (error) {
      
    }
  }

  

  const openModalSellar = async(sellerId) =>{
    const header = localStorage.getItem("_tokenCode");
    console.log("buyerIds", formData.buyerId);
    setBuyerId(sellerId)
    setOpenModal(true)
    try {
        const response = await API.order_listData_byId(sellerId, header)
        console.log("OrderResponse", response);
        setFormData(response.data.data[0])
        const selleresponse = await API.enquriys_sellerId(response.data.data[0].enquiryId, header)
        console.log("selleresponse", selleresponse);
        setSellerList(selleresponse.data.data);
    } catch (error) {
        
    }
}
const editSellerData = async () => {
  const header = localStorage.getItem("_tokenCode");
  try {
      const reqObj = {
        id: formData.buyerId,
        sellerId:formData.sellerId,
        unitPrice: formData.unitPrice,
        quantities: formData.quantities
      }
      console.log("reqObj", reqObj);
      const response = await API.order_data_edit(reqObj, header);
      console.log("response", response);
      if (response.data.success === 1) {
          closeModal()
          setFormData(initialData) 
          closeModal()
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
          <h3>Order</h3>
        </div>
        <div class="card">
          <div class="card-header">
            <div className='row'>
                <div className='col-md-10'>
                    <h4 class="card-title">Order list</h4>
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
                        <th>Buyer Details</th>
                        <th>Seller Details</th>
                        <th>Enquiry</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((item, index)=> (
                        <tr key={index}>
                          <td class="text-bold-500">{index + 1}</td>
                          <td class="text-bold-500">{item.buyer[0].firstName +' '+ item.buyer[0].lastName} </td>
                          <td class="text-bold-500">{item.seller[0].firstName +' '+ item.seller[0].lastName} </td>
                          <td>
                              <ul className='ps-0'>
                                <li><strong>Product details : </strong> {item.enquiry[0].product_des}</li>
                                <li><strong>Quantities : </strong> {item.enquiry[0].quantities}</li>
                                <li><strong>Size : </strong> {item.enquiry[0].size}</li>
                              </ul>
                          </td>
                          <td>
                            <div class="buttons">
                              <span onClick={() => openModalSellar(item._id)} class="btn icon btn-primary">
                                <i class="bi bi-pencil"></i>
                              </span>
                              <button onClick={()=> menufactheDelete(item._id)} class="btn icon btn-danger">
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
                <h5 class="modal-title" id="exampleModalLabel">Order Edit</h5>
              </div>
              <div class="modal-body">
                <div class="form-group">
                    <label for="basicInput">Seller List</label>
                    <select className="form-control" onChange={handalerChnages} name="sellerId" value={formData.sellerId}>
                        <option>--- Select ---</option>
                        {sellerList.map((item, index) => (
                            <option
                                value={item.seller._id}
                            >
                                {item.seller.firstName} {item.seller.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <div class="form-group">
                    <label for="basicInput">Amount</label>
                    <input type="text" class="form-control" 
                        placeholder="Amount" 
                        onChange={handalerChnages} 
                        value={formData.unitPrice}
                        name="unitPrice" />
                </div>
                <div class="form-group">
                    <label for="basicInput">Quantities</label>
                    <input type="text" class="form-control" placeholder="Quantities" 
                        onChange={handalerChnages} 
                        value={formData.quantities}
                        name="quantities" 
                    />
                </div>
                {/* <div class="form-group">
                    <label for="basicInput">Product details</label>
                    <textarea placeholder='Enter product details' rows="5" cols="5" 
                     value={formData.product_des}
                     name="product_des"
                     onChange={handalerChnages} 
                    className='form-control'></textarea>
                </div> */}
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

export default ManageOrderData