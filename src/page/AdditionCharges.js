import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IMG } from "../Api/constant";
import * as API from "../Api/index";
import Modal from "react-responsive-modal";
import { toast } from "react-toastify";
const AdditionCharges = () => {
  const [amountData, setAmountData] = useState("");

  const amountSubmit = async () => {
    const header = localStorage.getItem("_tokenCode");
    setAmountData("");
    try {
      const reqObj = {
        amount: amountData,
      };
      const response = await API.amountCharge(reqObj, header);

      if (response.data.success === 1) {
        setAmountData("");
      }
    } catch (error) {}
  };

  const searchHandaler = async (e) => {
    setAmountData(e.target.value);
  };

  return (
    <>
      <section class="section">
        <div class="page-heading">
          <h3>Addition Charges</h3>
        </div>
        <div class="card">
          <div class="card-header">
            <div className="row">
              <div className="col-md-7">
                <h4 class="card-title">Addition Charges</h4>
              </div>
              <div className="col-md-4">
                {/* <div class="form-group position-relative has-icon-right">
                      <input type="text" class="form-control" placeholder="Search here" 
                        onChange={searchHandaler}
                      />
                      <div class="form-control-icon">
                        <i class="bi bi-search"></i>
                      </div>
                    </div> */}
              </div>
              {/* <div className='col-md-1 text-end'>
                    <Link to="/add-manufacturers" class="btn icon btn-primary">
                        <i class="bi bi-plus"></i>
                    </Link>
                </div> */}
            </div>
          </div>
          <div class="card-body">
            <div class="align-items-center justify-content-center row">
              <div className="col-md-5">
                <div class="form-group position-relative has-icon-right">
                  <input
                    type="text"
                    value={amountData}
                    class="form-control"
                    placeholder="Amount"
                    onChange={searchHandaler}
                  />
                </div>
              </div>
              <div className="col-md-2">
                <button className="btn icon btn-primary" onClick={amountSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdditionCharges;
