import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card, Button, Container } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

const HelpSection = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const tokenObtained = localStorage.getItem("token");
    if (tokenObtained) {
      setIsLogin(true);
    }
  }, []);

  const handleAccordionToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is doctorId?",
      answer:
        "DoctorId is unique and global identification for government authorized doctors.",
    },
    {
      question: "What is patientId?",
      answer:
        "PatientId is unique and global identification for government authorized peoples.",
    },
    {
      question: "How doctor can login in portal?",
      answer:
        "By using doctorId and otp a doctor can login system, Otp will sent on registered mobile number.",
    },
    {
      question: "What doctor can do on this portal?",
      answer:
        "Doctor can consult a patient and can see the previous history between doctor and patient based on both unique identification.",
    },
    {
      question: "Not getting otp",
      answer:
        "Doctor can consult a patient and can see the previous history between doctor and patient based on both unique identification.",
    },
  ];

  return (
    <>
      <Navbar isDashboard={isLogin} />
      <Container className="w-80%">
        <h1 style={{ textAlign: "center", color: "grey" }}>Help Section</h1>
        {faqs.map((faq, index) => (
          <Accordion key={index}>
            <Accordion.Item eventKey={index + 1}>
              <Accordion.Header>
                <span style={{ color: "red" }}>
                  {index + 1}. {faq?.question}
                </span>
              </Accordion.Header>
              <Accordion.Body>{faq?.answer}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
      </Container>
      <Footer />
    </>
  );
};

export default HelpSection;
