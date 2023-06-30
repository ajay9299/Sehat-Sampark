// import React from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
// import Navbar from "@/components/Navbar";

// const PrescriptionForm = () => {
//   const { register, control, handleSubmit } = useForm();
//   const {
//     fields: testFields,
//     append: appendTest,
//     remove: removeTest,
//   } = useFieldArray({
//     control,
//     name: "recommendedTests",
//   });
//   const {
//     fields: medicationFields,
//     append: appendMedication,
//     remove: removeMedication,
//   } = useFieldArray({
//     control,
//     name: "medicationList",
//   });

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   return (
//     <>
//       <Navbar isDashboard={true} />
//       <Container
//         style={{ maxWidth: "80%", marginTop: "20px", marginBottom: "20px" }}
//       >
//         <Card style={{ borderRadius: "10px", padding: "20px" }}>
//           <Card.Header style={{ backgroundColor: "Gray", color: "white" }}>
//             <h5>Patient Details (Static)</h5>
//           </Card.Header>
//           <Card.Body>
//             <Form onSubmit={handleSubmit(onSubmit)}>
//               <Row>
//                 <Col>
//                   <Form.Group controlId="patientId">
//                     <Form.Label>Patient ID</Form.Label>
//                     <Form.Control
//                       type="text"
//                       {...register("patientId")}
//                       size="sm"
//                       readOnly
//                       className="form-input"
//                       value="3004"
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group controlId="patientName">
//                     <Form.Label>Patient Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       {...register("patientName")}
//                       value="vibhor"
//                       size="sm"
//                       readOnly
//                       className="form-input"
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group controlId="age">
//                     <Form.Label>Age</Form.Label>
//                     <Form.Control
//                       type="text"
//                       {...register("age")}
//                       size="sm"
//                       readOnly
//                       className="form-input"
//                       value="29 Year"
//                     />
//                   </Form.Group>
//                 </Col>

//                 <Col>
//                   <Form.Group controlId="mobileNumber">
//                     <Form.Label>Mobile Number</Form.Label>
//                     <Form.Control
//                       type="text"
//                       {...register("mobileNumber")}
//                       size="sm"
//                       readOnly
//                       className="form-input"
//                       value="9826782223"
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group controlId="gender">
//                     <Form.Label>Gender</Form.Label>
//                     <Form.Control
//                       type="text"
//                       {...register("gender")}
//                       size="sm"
//                       readOnly
//                       className="form-input"
//                       value="Male"
//                     ></Form.Control>
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row className="mt-2">
//                 <Col>
//                   <Form.Group controlId="symptoms">
//                     <Form.Label>Symptoms</Form.Label>
//                     <Form.Control
//                       type="text"
//                       {...register("symptoms")}
//                       size="sm"
//                       className="form-input"
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group controlId="durationOfSymptoms">
//                     <Form.Label>Duration of Symptoms</Form.Label>
//                     <Form.Control
//                       type="text"
//                       {...register("durationOfSymptoms")}
//                       size="sm"
//                       className="form-input"
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="mt-2">
//                 <Col>
//                   <Form.Group controlId="physicalExaminationFindings">
//                     <Form.Label>Physical Examination Findings</Form.Label>
//                     <Form.Control
//                       type="text"
//                       {...register("physicalExaminationFindings")}
//                       size="sm"
//                       className="form-input"
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Card
//                 style={{
//                   borderRadius: "10px",
//                   padding: "20px",
//                   marginTop: "20px",
//                   marginBottom: "20px",
//                 }}
//               >
//                 <Card.Body>
//                   <h5>Medication List</h5>
//                   {medicationFields.map((field, index) => (
//                     <div key={field.id}>
//                       <Row>
//                         <Col>
//                           <Form.Group controlId={`medicationName_${index}`}>
//                             <Form.Control
//                               type="text"
//                               {...register(
//                                 `medicationList.${index}.medicationName`
//                               )}
//                               placeholder="Medication Name"
//                               size="sm"
//                               className="form-input"
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col>
//                           <Form.Group controlId={`dosage_${index}`}>
//                             <Form.Control
//                               type="text"
//                               {...register(`medicationList.${index}.dosage`)}
//                               placeholder="Dosage"
//                               size="sm"
//                               className="form-input"
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col>
//                           <Form.Group controlId={`frequency_${index}`}>
//                             <Form.Control
//                               type="number"
//                               {...register(`medicationList.${index}.frequency`)}
//                               placeholder="Frequency"
//                               size="sm"
//                               className="form-input"
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col>
//                           <Form.Group controlId={`duration_${index}`}>
//                             <Form.Control
//                               type="text"
//                               {...register(`medicationList.${index}.duration`)}
//                               placeholder="Duration"
//                               size="sm"
//                               className="form-input"
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col>
//                           <Button
//                             type="button"
//                             variant="danger"
//                             size="sm"
//                             onClick={() => removeMedication(index)}
//                             style={{ margin: "5px" }}
//                           >
//                             Remove
//                           </Button>
//                         </Col>
//                       </Row>
//                     </div>
//                   ))}
//                   <Button
//                     type="button"
//                     size="sm"
//                     onClick={() => appendMedication({})}
//                     style={{ margin: "5px" }}
//                   >
//                     Add Medication
//                   </Button>
//                 </Card.Body>
//               </Card>

//               <Card
//                 style={{
//                   borderRadius: "10px",
//                   padding: "20px",
//                   marginTop: "20px",
//                   marginBottom: "20px",
//                 }}
//               >
//                 <Card.Body>
//                   <h5>Recommended Tests</h5>
//                   {testFields.map((field, index) => (
//                     <div key={field.id}>
//                       <Row>
//                         <Col>
//                           <Form.Group controlId={`testName_${index}`}>
//                             <Form.Control
//                               type="text"
//                               {...register(
//                                 `recommendedTests.${index}.testName`
//                               )}
//                               placeholder="Test Name"
//                               size="sm"
//                               className="form-input"
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col>
//                           <Form.Group controlId={`reasonForTest_${index}`}>
//                             <Form.Control
//                               type="text"
//                               {...register(
//                                 `recommendedTests.${index}.reasonForTest`
//                               )}
//                               placeholder="Reason for Test"
//                               size="sm"
//                               className="form-input"
//                             />
//                           </Form.Group>
//                         </Col>
//                         <Col>
//                           <Button
//                             type="button"
//                             variant="danger"
//                             size="sm"
//                             onClick={() => removeTest(index)}
//                             style={{ margin: "5px" }}
//                           >
//                             Remove
//                           </Button>
//                         </Col>
//                       </Row>
//                     </div>
//                   ))}
//                   <Button
//                     type="button"
//                     size="sm"
//                     onClick={() => appendTest({})}
//                     style={{ margin: "5px" }}
//                   >
//                     Add Test
//                   </Button>
//                 </Card.Body>
//               </Card>

//               <Form.Group
//                 controlId="additionalNotes"
//                 style={{ marginTop: "20px", marginBottom: "20px" }}
//               >
//                 <Form.Label>Additional Notes</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={3}
//                   {...register("additionalNotes")}
//                   size="sm"
//                   className="form-input"
//                 />
//               </Form.Group>

//               <Button type="submit" variant="primary" size="sm">
//                 Submit
//               </Button>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Container>
//     </>
//   );
// };

// export default PrescriptionForm;

import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import Navbar from "@/components/Navbar";

const PrescriptionForm = () => {
  useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.style.overflow = "hidden";

    // Enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "visible";
    };
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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Navbar isDashboard={true} />
      <Container
        style={{
          maxWidth: "80%",
          marginTop: "20px",
          marginBottom: "20px",
          overflowY: "auto",
          maxHeight: "calc(100vh - 120px)",
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
                    {...register("doctorId")}
                    size="sm"
                    readOnly
                    className="form-input"
                    value="3004"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="doctorName">
                  <Form.Label>Dr Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("doctorName")}
                    value="vidit"
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
                    {...register("departmentName")}
                    size="sm"
                    readOnly
                    className="form-input"
                    value="sexologist"
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="drmobileNumber">
                  <Form.Label>Dr Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("drmobileNumber")}
                    size="sm"
                    readOnly
                    className="form-input"
                    value="9826782223"
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
                    {...register("patientId")}
                    size="sm"
                    readOnly
                    className="form-input"
                    value="3004"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="patientName">
                  <Form.Label>Patient Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("patientName")}
                    value="chotu gupta"
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
                    {...register("age")}
                    size="sm"
                    readOnly
                    className="form-input"
                    value="29 Year"
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="mobileNumber">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("mobileNumber")}
                    size="sm"
                    readOnly
                    className="form-input"
                    value="9826782223"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("gender")}
                    size="sm"
                    readOnly
                    className="form-input"
                    value="Male"
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
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
                  <Form.Label>Physical Examination Findings</Form.Label>
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
                        <Form.Group controlId={`medicationName_${index}`}>
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
                            {...register(`medicationList.${index}.dosage`)}
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
                            {...register(`medicationList.${index}.frequency`)}
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
                            {...register(`medicationList.${index}.duration`)}
                            placeholder="Duration"
                            size="sm"
                            className="form-input"
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={3} className="d-flex align-items-center">
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
                            {...register(`recommendedTests.${index}.testName`)}
                            placeholder="Test Name"
                            size="sm"
                            className="form-input"
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={2}>
                        <Form.Group controlId={`reasonForTest_${index}`}>
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
                      <Col xs={3} className="d-flex align-items-center">
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

            <Button
              type="submit"
              variant="primary"
              size="lg"
              // className="btn"
              onClick={handleSubmit(onSubmit)}
              style={{ float: "right" }}
            >
              Submit
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default PrescriptionForm;
