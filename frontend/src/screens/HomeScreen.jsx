import React from "react";
import { Row, Col } from "react-bootstrap";
import Customer from "../components/Customer";
import customers from "../customers";

const HomeScreen = () => {
  return (
    <>
      <h1>Our Customers</h1>
      <Row>
        {customers.map((customer) => (
          <Col key={customer._id} sm={12} md={6} lg={4} xl={3}>
            <Customer customer={customer} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
