import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Customer from "../components/Customer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listCustomers } from "../actions/customerActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const customerList = useSelector((state) => state.customerList);
  const { loading, error, customers } = customerList;

  useEffect(() => {
    dispatch(listCustomers());
  }, [dispatch]);

  return (
    <>
      <h1>Our Customers</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {customers.map((customer) => (
              <Col key={customer._id} sm={12} md={6} lg={4} xl={3}>
                <Customer customer={customer} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
