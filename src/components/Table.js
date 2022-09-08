import React from "react";

const Table = () => {
  return (
    <section class="section">
      <div class="page-heading">
        <h3>Table</h3>
      </div>
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Table</h4>
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
                      <th>RATE</th>
                      <th>SKILL</th>
                      <th>TYPE</th>
                      <th>LOCATION</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-bold-500">1</td>
                      <td class="text-bold-500">Michael Right</td>
                      <td>$15/hr</td>
                      <td class="text-bold-500">UI/UX</td>
                      <td>Remote</td>
                      <td>Austin,Taxes</td>
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
                    <tr>
                      <td>2</td>
                      <td class="text-bold-500">Shangai,China</td>
                      <td>$13/hr</td>
                      <td class="text-bold-500">Graphic concepts</td>
                      <td>Remote</td>
                      <td>Shangai,China</td>
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
                    <tr>
                      <td>3</td>
                      <td class="text-bold-500">Tiffani Blogz</td>
                      <td>$15/hr</td>
                      <td class="text-bold-500">Animation</td>
                      <td>Remote</td>
                      <td>Austin,Texas</td>
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
                    <tr>
                      <td>4</td>
                      <td class="text-bold-500">Ashley Boul</td>
                      <td>$15/hr</td>
                      <td class="text-bold-500">Animation</td>
                      <td>Remote</td>
                      <td>Austin,Texas</td>
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
                    <tr>
                      <td>5</td>
                      <td class="text-bold-500">Mikkey Mice</td>
                      <td>$15/hr</td>
                      <td class="text-bold-500">Animation</td>
                      <td>Remote</td>
                      <td>Austin,Texas</td>
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
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Table;
