import React from "react";
import ManageBuyerEnquiry from "../page/ManageBuyerEnquiry";
import Table from "./Table";
import * as API from "../Api/index";
import { useState } from "react";
import { useEffect } from "react";
const Container = () => {
  const [sellerCont, setSellerCont] = useState([])
  const [buyerCount, setBuyerCount] = useState([])
  const [manufact, setManufact] = useState([])

  console.log("sellerCont", sellerCont , buyerCount);

  const getdetailsData = async () =>{
    const header = localStorage.getItem("_tokenCode");
    try {
      const sellerCount = await API.seller_count(header)
      sellerCount.data.data.map((item, index) =>(
        <>
          {
            item._id === "2" ? 
            setSellerCont(item.count) :  item._id === "3" ? setBuyerCount(item.count) : ""
          }
        </>
      ))
      const manufactCount = await API.menufactrher_count(header)
      setManufact(manufactCount.data.data)
    } catch (error) {
      
    }
  }


  useEffect(() => {
    getdetailsData()
  }, [])

  return (
    <>
      <div class="page-heading">
        <h3>DashBoard</h3>
      </div>
      <div class="page-content">
        <div class="row dashBoardCard">
          <div class="col-6 col-lg-3 col-md-6">
            <div class="card">
              <div class="card-body px-3 py-4-5">
                <div class="row">
                  <div class="col-md-4">
                    <div class="stats-icon purple">
                      <i class="iconly-boldShow"></i>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <h6 class="text-muted font-semibold">Total User</h6>
                    <h6 class="font-extrabold mb-0">{buyerCount + sellerCont}.00</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 col-lg-3 col-md-6">
            <div class="card">
              <div class="card-body px-3 py-4-5">
                <div class="row">
                  <div class="col-md-4">
                    <div class="stats-icon blue">
                      <i class="iconly-boldProfile"></i>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <h6 class="text-muted font-semibold">Buyer</h6>
                    <h6 class="font-extrabold mb-0">
                      {buyerCount}.00
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 col-lg-3 col-md-6">
            <div class="card">
              <div class="card-body px-3 py-4-5">
                <div class="row">
                  <div class="col-md-4">
                    <div class="stats-icon red">
                      <i class="iconly-boldBookmark"></i>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <h6 class="text-muted font-semibold">Manufacturer </h6>
                    <h6 class="font-extrabold mb-0">{manufact} . 00</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 col-lg-3 col-md-6">
            <div class="card">
              <div class="card-body px-3 py-4-5">
                <div class="row">
                  <div class="col-md-4">
                    <div class="stats-icon green">
                      <i class="iconly-boldAdd-User"></i>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <h6 class="text-muted font-semibold">Seller</h6>
                    <h6 class="font-extrabold mb-0">{sellerCont}.00</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <ManageBuyerEnquiry />
        </div>
      </div>
    </>
  );
};

export default Container;
