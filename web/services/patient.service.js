import axios from "axios";
export const confirmPatientIdAndProceed = async (token, id) => {
  try {
    let config = {
      method: "get",
      url: `http://localhost:3001/v1/api/patient/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.request(config);
  } catch (error) {
    console.log(error);
  }
};

export const bindDoctorDataInForm = async (token) => {
  try {
    let config = {
      method: "get",
      url: `http://localhost:3001/v1/api/doctor/myProfile`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.request(config);
  } catch (error) {
    console.log(error);
  }
};

export const patientInformationBindWithForm = async (data, token) => {
  try {
    let config = {
      method: "post",
      url: "http://localhost:3001/v1/api/doctor/consult",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    return await axios.request(config);
  } catch (error) {
    console.log;
  }
};
