import React, { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as API from "../Api/index";
const initialData = {
  manufacturerId: "",
  product_des: "",
  unitPrice: "",
  quantities: "",
  sellerId: "",
};
const ManageBuyerEnquiry = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);
  const [tableData, setTableData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [sellerList, setSellerList] = useState([]);
  const [buyerId, setBuyerId] = useState("");
  const [enquerisId, setEnquerisId] = useState("");

  const handalerChnages = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getdetailsData = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.enquriys_list(header);

      if (response.data.success === 2) {
        navigate("/");
        localStorage.removeItem("isLoginCheck");
        setIsLogin(localStorage.removeItem("isLoginCheck"));
        localStorage.removeItem("_userId");
        localStorage.removeItem("_tokenCode");
      }
      setTableData(response.data.data);
    } catch (error) {}
  };

  const approveAdmin = async (enquId) => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const reqObj = {
        userid: localStorage.getItem("_userId"),
        id: enquId,
      };
      const response = await API.enquriys_approve(reqObj, header);

      if (response.data.success === 1) {
        getdetailsData();
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
    } catch (error) {}
  };

  const editSellerData = async () => {
    const header = localStorage.getItem("_tokenCode");
    try {
      const reqObj = {
        buyerId: buyerId,
        sellerId: formData.sellerId,
        enquiryId: enquerisId,
        unitPrice: formData.unitPrice,
        quantities: formData.quantities,
      };

      const response = await API.order_data(reqObj, header);

      if (response.data.success === 1) {
        closeModal();
        setFormData(initialData);
      }
    } catch (error) {}
  };

  const openModalSellar = async (enqurisId, buyerId) => {
    const header = localStorage.getItem("_tokenCode");

    setEnquerisId(enqurisId);
    setBuyerId(buyerId);
    setOpenModal(true);
    try {
      const response = await API.enquriys_sellerId(enqurisId, header);

      setSellerList(response.data.data);
    } catch (error) {}
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    getdetailsData();
  }, []);

  return (
    <>
      <section class="section">
        <div class="page-heading">
          <h3>Manage Buyer Enquiry</h3>
        </div>
        <div class="card">
          <div class="card-header">
            <div className="row">
              <div className="col-md-10">
                <h4 class="card-title">Manage Buyer Enquiry</h4>
              </div>
              <div className="col-md-2 text-end">
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
                        {/* <th>ACTION</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((item, index) => (
                        <tr>
                          <td class="text-bold-500">{index + 1}</td>
                          <td class="text-bold-500">
                            {item.manufacturer.name}
                          </td>
                          <td>{item.quantities}</td>
                          <td class="text-bold-500">{item.size}</td>
                          <td>{item.product_des}</td>
                          {/* <td>
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
                                                <button class="btn btn-primary icon" onClick={() => openModalSellar(item._id, item.buyer._id)}>
                                                    Generate order 
                                                </button>
                                            )}
                                        </div>
                                    </td> */}
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
            <h5 class="modal-title" id="exampleModalLabel">
              Order generate
            </h5>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="basicInput">Seller List</label>
              <select
                className="form-control"
                onChange={handalerChnages}
                name="sellerId"
                value={formData.sellerId}
              >
                <option>--- Select ---</option>
                {sellerList.map((item, index) => (
                  <option value={item.seller._id}>
                    {item.seller.firstName} {item.seller.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div class="form-group">
              <label for="basicInput">Amount</label>
              <input
                type="text"
                class="form-control"
                placeholder="Amount"
                onChange={handalerChnages}
                value={formData.unitPrice}
                name="unitPrice"
              />
            </div>
            <div class="form-group">
              <label for="basicInput">Quantities</label>
              <input
                type="text"
                class="form-control"
                placeholder="Quantities"
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
            <button
              type="button"
              class="btn btn-primary"
              onClick={editSellerData}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ManageBuyerEnquiry;
