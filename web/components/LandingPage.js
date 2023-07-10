import {
  signInDoctorService,
  verifyOtpfunctionality,
} from "@/services/doctor.service";
import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { Toast } from "react-bootstrap";
import SpinnerLoader from "./Spinner";

const LandingPage = () => {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [doctorId, setDoctorId] = useState("");
  const [isOtpEntered, setIsOtpEntered] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const otpInputsRef = useRef([]);
  const [toast, setToast] = useState(0);

  const handleOtpChange = (e, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = e.target.value;
    setOtp(updatedOtp);
    updatedOtp[5] ? setIsOtpEntered(true) : setIsOtpEntered(false);

    if (e.target.value && otpInputsRef.current[index + 1]) {
      otpInputsRef.current[index + 1].focus();
    }
  };

  const signInDoctor = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const apiResponse = await signInDoctorService(doctorId);
      if (apiResponse.status == 200) {
        setIsSubmit(true);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setDoctorId("");
      setShowToast(true);
      console.log(error);
    }
  };

  const handleOtpAndVerify = async (e) => {
    const data = {
      doctorId: doctorId,
      otp: otp.join(""),
    };
    setLoading(true);

    try {
      const output = await verifyOtpfunctionality(data);
      const token = output?.data?.data?.jwtToken;
      if (output.status === 200) {
        localStorage.setItem("token", token);
        router.push("./dashboard");
        setDoctorId("");
        setIsSubmit(false);
      } else {
      }
    } catch (error) {
      setOtp(["", "", "", "", "", ""]);
      setDoctorId("");
      setIsSubmit(false);
      setLoading(false);
      setToast(1);
      setShowToast(true);
      console.log(error);
    }
  };

  return (
    <>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "red",
          color: "white",
        }}
      >
        <Toast.Header>
          <strong className="me-auto">
            {!toast ? "Invalid DoctorId" : "Wrong Otp"}
          </strong>
        </Toast.Header>
        <Toast.Body>Please try again.</Toast.Body>
      </Toast>
      {loading ? (
        <SpinnerLoader />
      ) : (
        <div className="container-fluid h-100">
          <div className="row h-100">
            {/* Left Section */}
            <div className="col-md-6 d-flex align-items-stretch">
              <img
                src="/doctor1.jpg" // Replace with your actual image source
                alt="Cover Image"
                className="img-fluid h-100"
              />
            </div>

            {/* Right Section */}

            {!isSubmit ? (
              <div className="col-md-6 d-flex align-items-center">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-md-8">
                      <div className="card rounded">
                        <div className="card-body bg-light">
                          <h4 className="card-title text-center mb-4 text-danger">
                            SignIn
                          </h4>
                          <form>
                            <div className="form-group">
                              <label htmlFor="doctorId">Doctor ID</label>
                              <input
                                type="text"
                                className="form-control"
                                id="doctorId"
                                placeholder="Enter Doctor ID"
                                value={doctorId}
                                onChange={(e) => setDoctorId(e.target.value)}
                              />
                            </div>
                            <button
                              type="submit"
                              className="btn btn-outline-danger"
                              onClick={(e) => signInDoctor(e)}
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
            ) : (
              <div className="col-md-6 d-flex align-items-center">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-md-8">
                      <div className="card rounded">
                        <div className="card-body bg-light">
                          <h4 className="card-title text-center mb-4">
                            Otp Verification
                          </h4>
                          <label style={{ marginLeft: "8px" }}>
                            Please enter six digit otp
                          </label>
                          <div className="d-flex justify-content-center align-items-center">
                            {otp.map((digit, index) => (
                              <input
                                id={index + "otp"}
                                key={index}
                                type="text"
                                className="form-control text-center mx-2"
                                value={digit}
                                onChange={(e) => handleOtpChange(e, index)}
                                ref={(input) =>
                                  (otpInputsRef.current[index] = input)
                                }
                                maxLength={1}
                              />
                            ))}
                          </div>

                          <button
                            className="btn btn-outline-danger"
                            onClick={handleOtpAndVerify}
                            style={{ marginTop: "10px", marginLeft: "8px" }}
                            disabled={!isOtpEntered}
                          >
                            Verify OTP
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
