import React, { useState, useRef } from "react";

const Dashboard = () => {
  const [isSubmit, setIsSubmit] = useState(false);

  return (
    <>
      <div className="container-fluid h-80">
        <div className="row h-100">
          {/* Left Section */}
          <div
            className="col-md-6 d-flex align-items-stretch"
            style={{ overflow: "hidden" }}
          >
            <img
              src="/patient3.jpg" // Replace with your actual image source
              alt="Cover Image"
              className="img-fluid h-100"
            />
          </div>

          {/* Right Section */}
          <div className="col-md-6 d-flex align-items-center">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="card rounded">
                    <div className="card-body bg-light">
                      <h4 className="card-title text-center text-danger mb-4">
                        Consulate Patient
                      </h4>
                      <form>
                        <div className="form-group">
                          <label htmlFor="doctorId">Patient ID</label>
                          <input
                            type="text"
                            className="form-control"
                            id="doctorId"
                            placeholder="Enter Patient ID"
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-outline-danger"
                          onClick={() => setIsSubmit(true)}
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
