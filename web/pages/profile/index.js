import Navbar from "@/components/Navbar";
import SpinnerLoader from "@/components/Spinner";
import { getDoctorProfile } from "@/services/doctor.service";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const ProfilePage = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    doctorId: "",
    departmentI: "",
    departmentName: "",
    name: "",
    dob: "",
    gen: "",
    phoneNumber: "",
    email: "",
    state: "",
    district: "",
    subDistrict: "",
    street: "",
    pinCode: "",
  });

  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tokenObtained = localStorage.getItem("token");
    if (!tokenObtained) {
      router.replace("/");
    } else {
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    async function myProfile() {
      if (isLogin) {
        const tokenObtained = localStorage.getItem("token");
        const apiResponse = await getDoctorProfile(tokenObtained);
        if (apiResponse.status == 200) {
          setLoading(true);
          setProfileData(apiResponse.data.data.doctorInfo);
        }
      }
    }
    myProfile();
  }, [isLogin]);

  return (
    <>
      {
        <>
          {isLogin && <Navbar isDashboard={isLogin} />}
          {!loading ? (
            <SpinnerLoader />
          ) : (
            isLogin && (
              <>
                <Container className="p-4 bg-light rounded shadow">
                  <h1 className="text-center mb-4">My Profile</h1>
                  <Row className="mb-3">
                    <Col>
                      <h2 className="mb-3">Doctor Information</h2>
                      <p>
                        <strong>Doctor ID:</strong> {profileData.doctorId}
                      </p>
                      <p>
                        <strong>Department ID:</strong>{" "}
                        {profileData.departmentId}
                      </p>
                      <p>
                        <strong>Department Name:</strong>{" "}
                        {profileData.departmentName}
                      </p>
                    </Col>
                    <Col>
                      <h2 className="mb-3">Personal Information</h2>
                      <p>
                        <strong>Name:</strong> {profileData.name}
                      </p>
                      <p>
                        <strong>Date of Birth:</strong> {profileData.dob}
                      </p>
                      <p>
                        <strong>Gender:</strong> {profileData.gender}
                      </p>
                      <p>
                        <strong>Phone Number:</strong> {profileData.phoneNumber}
                      </p>
                      <p>
                        <strong>Email:</strong> {profileData.email}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h2 className="mb-3">Address</h2>
                      <p>
                        <strong>State:</strong> {profileData.state}
                      </p>
                      <p>
                        <strong>District:</strong> {profileData.district}
                      </p>
                      <p>
                        <strong>Sub-District:</strong> {profileData.subDistrict}
                      </p>
                      <p>
                        <strong>Street:</strong> {profileData.street}
                      </p>
                      <p>
                        <strong>Pin Code:</strong> {profileData.pinCode}
                      </p>
                    </Col>
                  </Row>
                </Container>
              </>
            )
          )}
        </>
      }
    </>
  );
};

export default ProfilePage;
