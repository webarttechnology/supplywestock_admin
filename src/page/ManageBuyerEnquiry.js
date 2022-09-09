import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import * as API from "../Api/index";
const ManageBuyerEnquiry = () => {
    const [tableData, setTableData] = useState([])

  const getdetailsData = async () =>{
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.enquriys_list(header)
      console.log("responsewwww", response);
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
    </>
  )
}

export default ManageBuyerEnquiry