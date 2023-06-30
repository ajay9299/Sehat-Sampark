import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    example: yup
      .number()
      .typeError("Input must be a number")
      .positive("Input must be a positive number")
      .integer("Input must be an integer")
      .max(999999999999, "Input cannot exceed 12 digits"),
  })
  .required();

const Dashboard = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);

  const onSubmit = (data) => {
    localStorage.setItem("patientId", data.example);
    console.log(data.example);
  };

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
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                          <label htmlFor="doctorId">Patient ID</label>
                          <input
                            {...register("example")}
                            type="text"
                            className="form-control"
                            id="doctorId"
                            placeholder="Enter Patient ID"
                          />
                          {errors.example && (
                            <p style={{ color: "red" }}>
                              {errors.example.message}
                            </p>
                          )}
                        </div>
                        <button
                          type="submit"
                          className="btn btn-outline-danger"
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
