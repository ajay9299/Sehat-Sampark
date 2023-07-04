import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import Navbar from "@/components/Navbar";
import moment from "moment";
import {
  bindDoctorDataInForm,
  patientInformationBindWithForm,
} from "../../services/patient.service.js";
import { useRouter } from "next/router.js";
import SpinnerLoader from "@/components/Spinner.js";

const PrescriptionForm = () => {
  ///get items from local storage
  const router = useRouter();
  const [drInformation, setDrInformation] = useState({});
  const [loading, setLoading] = useState(false);
  const [parseGetPatientIdDetails, setParseGetPatientIdDetails] = useState({});
  const [patientIdBind, SetPatientIdBind] = useState("");

  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    const tokenObtained = localStorage.getItem("token");
    if (!tokenObtained) {
      router.replace("/");
    } else {
      setIsShow(true);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const getPatientIdDetails = localStorage.getItem("patientIdInformation");
    setParseGetPatientIdDetails(JSON.parse(getPatientIdDetails));
    SetPatientIdBind(localStorage.getItem("patientId"));

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  useEffect(() => {
    async function getDrInformation() {
      let getToken = localStorage.getItem("token");
      const data = await bindDoctorDataInForm(getToken);
      setDrInformation(data?.data?.data?.doctorInfo);
    }
    getDrInformation();
  }, []);

  const { register, control, handleSubmit } = useForm();
  const {
    fields: testFields,
    append: appendTest,
    remove: removeTest,
  } = useFieldArray({
    control,
    name: "recommendedTests",
  });
  const {
    fields: medicationFields,
    append: appendMedication,
    remove: removeMedication,
  } = useFieldArray({
    control,
    name: "medicationList",
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const getToken = localStorage.getItem("token");
    const realData = { ...data, patientId: patientIdBind };
    const res = await patientInformationBindWithForm(realData, getToken);
    if (res.status == 200) {
      router.push("/patienthistory");
    }
  };

  const calculateAge = (dob) => {
    const birthDate = moment(dob, "DD-MM-YYYY");
    const currentDate = moment();
    const age = currentDate.diff(birthDate, "years");
    return age;
  };
  const calculatedAge = calculateAge(parseGetPatientIdDetails?.dob);

  return (
    <>
      <Navbar isDashboard={true} />
      {isShow && (
        <>
          {" "}
          <h1 style={{ textAlign: "center" }}>Patient Consulating Form</h1>
          {loading ? (
            <SpinnerLoader />
          ) : (
            parseGetPatientIdDetails && (
              <Container
                style={{
                  maxWidth: "80%",
                  marginTop: "20px",
                  marginBottom: "20px",
                  overflowY: "auto",
                  maxHeight: "calc(90vh - 120px)",
                }}
              >
                <Card style={{ borderRadius: "10px", padding: "20px" }}>
                  <Card.Header
                    style={{
                      backgroundColor: "#dbdbdb",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  >
                    <h5>Patient Consulating Details</h5>
                  </Card.Header>

                  <Card.Body>
                    <Row>
                      <Col>
                        <Form.Group controlId="doctorId">
                          <Form.Label>Dr ID</Form.Label>
                          <Form.Control
                            type="text"
                            // {...register("doctorId")}
                            size="sm"
                            readOnly
                            className="form-input"
                            value={drInformation?.doctorId}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="doctorName">
                          <Form.Label>Dr Name</Form.Label>
                          <Form.Control
                            type="text"
                            // {...register("doctorName")}
                            value={drInformation?.name}
                            size="sm"
                            readOnly
                            className="form-input"
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="departmentName">
                          <Form.Label>Department Name</Form.Label>
                          <Form.Control
                            type="text"
                            // {...register("departmentName")}
                            size="sm"
                            readOnly
                            className="form-input"
                            value={drInformation?.departmentName}
                          />
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group controlId="drmobileNumber">
                          <Form.Label>Dr Mobile Number</Form.Label>
                          <Form.Control
                            type="text"
                            // {...register("drmobileNumber")}
                            size="sm"
                            readOnly
                            className="form-input"
                            value={drInformation?.phoneNumber}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <hr />

                    <Row>
                      <Col>
                        <Form.Group controlId="patientId">
                          <Form.Label>Patient ID</Form.Label>
                          <Form.Control
                            type="text"
                            // {...register("patientId")}
                            size="sm"
                            readOnly
                            className="form-input"
                            value={patientIdBind}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="patientName">
                          <Form.Label>Patient Name</Form.Label>
                          <Form.Control
                            type="text"
                            // {...register("patientName")}
                            value={parseGetPatientIdDetails?.name}
                            size="sm"
                            readOnly
                            className="form-input"
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="age">
                          <Form.Label>Age</Form.Label>
                          <Form.Control
                            type="text"
                            // {...register("age")}
                            size="sm"
                            readOnly
                            className="form-input"
                            value={`${calculatedAge} year`}
                          />
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group controlId="mobileNumber">
                          <Form.Label>Mobile Number</Form.Label>
                          <Form.Control
                            type="text"
                            // {...register("mobileNumber")}
                            size="sm"
                            readOnly
                            className="form-input"
                            value={parseGetPatientIdDetails?.phoneNumber}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="gender">
                          <Form.Label>Gender</Form.Label>
                          <Form.Control
                            type="text"
                            // {...register("gender")}
                            size="sm"
                            readOnly
                            className="form-input"
                            value={parseGetPatientIdDetails?.gender}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Row className="mt-2">
                        <Col>
                          <Form.Group controlId="symptoms">
                            <Form.Label>Symptoms</Form.Label>
                            <Form.Control
                              type="text"
                              {...register("symptoms")}
                              size="sm"
                              className="form-input"
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="durationOfSymptoms">
                            <Form.Label>Duration of Symptoms</Form.Label>
                            <Form.Control
                              type="text"
                              {...register("durationOfSymptoms")}
                              size="sm"
                              className="form-input"
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row className="mt-2">
                        <Col>
                          <Form.Group controlId="physicalExaminationFindings">
                            <Form.Label>
                              Physical Examination Findings
                            </Form.Label>
                            <Form.Control
                              type="text"
                              {...register("physicalExaminationFindings")}
                              size="sm"
                              className="form-input"
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Card
                        style={{
                          borderRadius: "10px",
                          padding: "20px",
                          marginTop: "20px",
                          marginBottom: "20px",
                        }}
                      >
                        <Card.Body>
                          <h5>Medication List</h5>
                          {medicationFields.map((field, index) => (
                            <div key={field.id}>
                              <Row className="d-flex align-items-center">
                                <Col xs={3}>
                                  <Form.Group
                                    controlId={`medicationName_${index}`}
                                  >
                                    <Form.Control
                                      type="text"
                                      {...register(
                                        `medicationList.${index}.medicationName`
                                      )}
                                      placeholder="Medication Name"
                                      size="sm"
                                      className="form-input"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col xs={2}>
                                  <Form.Group controlId={`dosage_${index}`}>
                                    <Form.Control
                                      type="text"
                                      {...register(
                                        `medicationList.${index}.dosage`
                                      )}
                                      placeholder="Dosage"
                                      size="sm"
                                      className="form-input"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col xs={2}>
                                  <Form.Group controlId={`frequency_${index}`}>
                                    <Form.Control
                                      type="number"
                                      {...register(
                                        `medicationList.${index}.frequency`
                                      )}
                                      placeholder="Frequency"
                                      size="sm"
                                      className="form-input"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col xs={2}>
                                  <Form.Group controlId={`duration_${index}`}>
                                    <Form.Control
                                      type="text"
                                      {...register(
                                        `medicationList.${index}.duration`
                                      )}
                                      placeholder="Duration"
                                      size="sm"
                                      className="form-input"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col
                                  xs={3}
                                  className="d-flex align-items-center"
                                >
                                  <Button
                                    type="button"
                                    variant="danger"
                                    size="sm"
                                    onClick={() => removeMedication(index)}
                                    style={{ margin: "5px" }}
                                  >
                                    Remove
                                  </Button>
                                </Col>
                              </Row>
                            </div>
                          ))}
                          <Button
                            type="button"
                            // size="sm"
                            className="btn mt-10"
                            onClick={() => appendMedication({})}
                            style={{ margin: "5px", width: "150px" }}
                          >
                            Add Medication
                          </Button>
                        </Card.Body>
                      </Card>

                      <Card
                        style={{
                          borderRadius: "10px",
                          padding: "20px",
                          marginTop: "20px",
                          marginBottom: "20px",
                        }}
                      >
                        <Card.Body>
                          <h5>Recommended Tests</h5>
                          {testFields.map((field, index) => (
                            <div key={field.id}>
                              <Row className="d-flex align-items-center">
                                <Col xs={2}>
                                  <Form.Group controlId={`testName_${index}`}>
                                    <Form.Control
                                      type="text"
                                      {...register(
                                        `recommendedTests.${index}.testName`
                                      )}
                                      placeholder="Test Name"
                                      size="sm"
                                      className="form-input"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col xs={2}>
                                  <Form.Group
                                    controlId={`reasonForTest_${index}`}
                                  >
                                    <Form.Control
                                      type="text"
                                      {...register(
                                        `recommendedTests.${index}.reasonForTest`
                                      )}
                                      placeholder="Reason for Test"
                                      size="sm"
                                      className="form-input"
                                    />
                                  </Form.Group>
                                </Col>
                                <Col
                                  xs={3}
                                  className="d-flex align-items-center"
                                >
                                  <Button
                                    type="button"
                                    variant="danger"
                                    size="sm"
                                    onClick={() => removeTest(index)}
                                    style={{ margin: "5px" }}
                                  >
                                    Remove
                                  </Button>
                                </Col>
                              </Row>
                            </div>
                          ))}
                          <Button
                            type="button"
                            className="btn"
                            onClick={() => appendTest({})}
                            style={{ margin: "5px", width: "150px" }}
                          >
                            Add Test
                          </Button>
                        </Card.Body>
                      </Card>
                      <Row className="mt-2">
                        <Col>
                          <Form.Group controlId="physicalExaminationFindings">
                            <Form.Label>Additional Notes</Form.Label>
                            <Form.Control
                              type="text"
                              {...register("additionalNotes")}
                              size="sm"
                              className="form-input"
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="btn tm mt-3"
                        style={{ float: "right" }}
                      >
                        Submit
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Container>
            )
          )}
        </>
      )}
    </>
  );
};

export default PrescriptionForm;
