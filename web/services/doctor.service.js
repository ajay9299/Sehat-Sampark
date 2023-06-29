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
