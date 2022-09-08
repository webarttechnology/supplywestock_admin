import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IMG } from '../Api/constant';
import * as API from "../Api/index";
const Manufacturers = () => {
  const [tableData, setTableData] = useState([])

  const getdetailsData = async () =>{
    const header = localStorage.getItem("_tokenCode");
    try {
      const response = await API.menufacther_listing(header)
      setTableData(response.data.data)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getdetailsData()
  }, [])
  

  return (
    <section class="section">
      <div class="page-heading">
        <h3>Manufacturers</h3>
      </div>
      <div class="card">
        <div class="card-header">
          <div className='row'>
              <div className='col-md-10'>
                  <h4 class="card-title">Manufacturers list</h4>
              </div>
              <div className='col-md-2 text-end'>
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
                    {tableData.map((item, index)=> (
                      <tr key={index}>
                        <td class="text-bold-500">{index + 1}</td>
                        <td class="text-bold-500">{item.value} </td>
                        <td>
                          <img className='menufLogo' src={IMG + item.image} alt="" />
                        </td>
                        <td>
                          <div class="buttons">
                            <a href="#" class="btn icon btn-primary">
                              <i class="bi bi-pencil"></i>
                            </a>
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
  )
}

export default Manufacturers