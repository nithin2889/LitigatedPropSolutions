import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Customer from "../components/Customer";

const HomeScreen = () => {
  const [customers, setCustomers] = useState([]);

  // useEffect runs as soon as the component loads
  useEffect(() => {
    const fetchCustomers = async () => {
      const { data } = await axios.get("/api/customers");
      setCustomers(data);
    };
    fetchCustomers();
  }, []);

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
