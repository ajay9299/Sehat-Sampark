import Navbar from "@/components/Navbar";
import SpinnerLoader from "@/components/Spinner";
import { getPatientConsultHistory } from "@/services/doctor.service";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";

const PatientHistory = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };
  useEffect(() => {
    const tokenObtained = localStorage.getItem("token");
    if (!tokenObtained) {
      router.replace("/");
    } else {
      setIsLogin(false);
    }
  }, []);

  useEffect(() => {
    async function getPatientConsultData() {
      const tokenObtained = localStorage.getItem("token");
      const patientId = localStorage.getItem("patientId");
      const apiResponse = await getPatientConsultHistory(
        tokenObtained,
        patientId
      );
      if (apiResponse.status == 200) {
        setData(apiResponse.data.data);
        setLoading(false);
        setIsLogin(true);
      }
    }
    getPatientConsultData();
  }, []);

  return (
    <>
      {isLogin && <Navbar isDashboard={isLogin} />}

      {loading ? (
        <SpinnerLoader />
      ) : (
        isLogin && (
          <>
            {" "}
            <h1 className="text-center">Consult History</h1>
            <Container style={{ maxHeight: "500px", overflowY: "auto" }}>
              <Row>
                <Col>
                  <div>
                    {data?.map((info, index) => (
                      <Container key={index}>
                        <Card>
                          <Card.Body>
                            <Card.Title>
                              Patient ID: {info.patientId}
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                              Doctor ID: {info.doctorId}
                            </Card.Subtitle>
                            <Card.Text>
                              <b>Symptoms:</b> {info.symptoms}
                            </Card.Text>
                            <Card.Text>
                              <b>Duration of Symptoms:</b>{" "}
                              {info.durationOfSymptoms}
                            </Card.Text>
                            <Card.Text>
                              <b>Physical Examination Findings:</b>{" "}
                              {info.physicalExaminationFindings}
                            </Card.Text>
                            <Card.Text as="div" className="mb-3">
                              <b>Medication:</b>
                              <ListGroup>
                                {info.medicationList.map(
                                  (medication, medicationIndex) => (
                                    <ListGroup.Item
                                      key={medicationIndex}
                                      className="text-muted"
                                    >
                                      <Card.Text>
                                        <b>Dosage:</b> {medication.dosage}
                                      </Card.Text>
                                      <Card.Text>
                                        <b>Duration:</b> {medication.duration}
                                      </Card.Text>
                                      <Card.Text>
                                        <b>Frequency:</b> {medication.frequency}
                                      </Card.Text>
                                      <Card.Text>
                                        <b>Medication Name:</b>{" "}
                                        {medication.medicationName}
                                      </Card.Text>
                                    </ListGroup.Item>
                                  )
                                )}
                              </ListGroup>
                            </Card.Text>
                            <Card.Text as="div" className="mb-3">
                              <b>Recommended Tests:</b>
                              <ListGroup>
                                {info.recommendedTests.map(
                                  (test, testIndex) => (
                                    <ListGroup.Item
                                      key={testIndex}
                                      className="text-muted"
                                    >
                                      <Card.Text>
                                        <b>Test Name:</b> {test.testName}
                                      </Card.Text>
                                      <Card.Text>
                                        <b>Reason:</b> {test.reasonForTest}
                                      </Card.Text>
                                    </ListGroup.Item>
                                  )
                                )}
                              </ListGroup>
                            </Card.Text>
                            <Card.Text>
                              <b>Additional Notes:</b> {info.additionalNotes}
                            </Card.Text>
                            <Card.Text>
                              <b>Issue Date:</b> {formatDate(info.createdAt)}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                        <hr />
                      </Container>
                    ))}
                  </div>
                </Col>
              </Row>
            </Container>
          </>
        )
      )}
    </>
  );
};

export default PatientHistory;
