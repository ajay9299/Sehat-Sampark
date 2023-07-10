import axios from "axios";

export const signInDoctorService = async (doctorId) => {
  try {
    let data = JSON.stringify({
      doctorId,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/v1/api/doctor/signIn",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    return await axios.request(config);
  } catch (error) {
    console.log(error);
  }
};

export const verifyOtpfunctionality = async (data) => {
  try {
    let config = {
      method: "post",
      url: "http://localhost:3001/v1/api/doctor/otpVerify",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    return await axios.request(config);
  } catch (error) {
    console.log(error);
  }
};

export const getDoctorProfile = async (token) => {
  try {
    console.log("???????????token", token);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/v1/api/doctor/myProfile",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.request(config);
  } catch (error) {
    console.log(error);
  }
};

export const getPatientConsultHistory = async (token, patientId) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3001/v1/api/doctor/${patientId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return await axios.request(config);
  } catch (error) {
    console.log(error);
  }
};
