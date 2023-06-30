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
  // const dataaa = {
  //   patientId: data.patientId,
  //   symptoms: data.symptoms,
  //   durationOfSymptoms: data.durationOfSymptoms,
  //   physicalExaminationFindings: data.physicalExaminationFindings,
  //   medicationList: [
  //     {
  //       medicationName: "Medicine A",
  //       dosage: "10mg",
  //       frequency: "Twice a day",
  //       duration: "1 week",
  //     },
  //     {
  //       medicationName: "Medicine B",
  //       dosage: "5mg",
  //       frequency: "Once a day",
  //       duration: "2 weeks",
  //     },
  //   ],
  //   recommendedTests: [
  //     {
  //       testName: "Blood test",
  //       reasonForTest: "To check for infection",
  //     },
  //     {
  //       testName: "X-ray",
  //       reasonForTest: "To examine the lungs",
  //     },
  //   ],
  //   additionalNotes: data.additionalNotes,
  // };

  try {
    let config = {
      method: "post",
      url: "http://localhost:3001/v1/api/doctor/consulate",
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
