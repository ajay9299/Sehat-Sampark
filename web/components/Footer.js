import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer fixed-bottom">
      <Container>
        <Row>
          <Col className="text-center">
            <strong>
              <p className="p-10 ">@Powered by Radixians</p>
            </strong>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
