import React from "react";

const Profile = () => {
  return (
    <section class="section">
      <div class="page-heading">
        <h3>Profile</h3>
      </div>
      <div className="row mt-3">
        <div className="col-md-8">
          <div class="card">
            <div className="row">
              <div className="col-lg-3">
                <div class="user_profile">
                  <img src="assets/images/faces/2.jpg" alt="" srcset="" />
                </div>
              </div>
              <div className="col-lg-8 user_procard">
                <div class="card-header px-0">
                  <h4 class="card-title mb-0">Stive Jobs</h4>
                  <label for="basicInput">@apple021</label>
                  <p className="mb-0 mt-3">
                    Restylane Kysse (hyaluronic acid) is a hyaluronic acid of
                    bacterial origin, with a moderate lifting capacity indicated
                    for
                  </p>
                </div>
                <div class="card-body px-0">
                  <div class="buttons">
                    <button class="btn btn-success rounded-pill">
                      Active{" "}
                    </button>
                    <button class="btn btn btn-primary rounded-pill">
                      Follow{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div class="card">
            {/* <div class="card-header">
              <h4 class="card-title mb-0"></h4>
            </div> */}
            <div class="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="userproIcon">
                    <i class="fas fa-users text-success"></i>
                    <p className="mb-0">Total User</p>
                    <span>7979</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="userproIcon">
                    <i class="fas fa-box text-danger"></i>
                    <p className="mb-0">All Product</p>
                    <span>2245</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="userproIcon">
                    <i class="fas fa-box text-primary"></i>
                    <p className="mb-0">Total Order</p>
                    <span>1254</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="userproIcon">
                    <i class="fas fa-box text-info"></i>
                    <p className="mb-0">order delivery</p>
                    <span>5463</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Edit Profile</h4>
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
                    />
                  </div>
                  <div class="form-group">
                    <label for="basicInput">User Name</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="User Name"
                    />
                  </div>
                  <div class="form-group">
                    <label for="basicInput">Email</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Email adderss"
                    />
                  </div>
                  <div className="buttons customBtn mt-3">
                    <button class="btn btn-primary rounded-pill">
                      Submit
                      <div class="icon dripicons dripicons-arrow-right"></div>
                    </button>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="disabledInput">Mobile</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Mobile Number"
                    />
                  </div>
                  <div class="form-group">
                    <fieldset class="form-group">
                      <label for="helperText">State</label>
                      <select class="form-control">
                        <option>State1</option>
                        <option>State2</option>
                        <option>State3</option>
                      </select>
                    </fieldset>
                  </div>
                  {/* <div class="form-floating mb-3">
                    <textarea
                      class="form-control"
                      placeholder="Leave a comment here"
                      rows="10"
                      cols="5"
                    ></textarea>
                    <label for="floatingTextarea">Comments</label>
                  </div> */}

                  {/* <fieldset class="form-group">
                    <label for="helperText">Select Input</label>
                    <select class="form-control">
                      <option>IT</option>
                      <option>Blade Runner</option>
                      <option>Thor Ragnarok</option>
                    </select>
                  </fieldset> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
