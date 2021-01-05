import React, { useEffect } from "react";
import { Row, Col, ListGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getPaymentDetails } from "../actions/paymentActions";
import { listCustomerDetails } from "../actions/customerActions";

const PaymentDetailsScreen = ({ match }) => {
  const paymentId = match.params.id;
  const customerId = match.params.custId;

  const dispatch = useDispatch();

  const paymentDetails = useSelector((state) => state.paymentDetails);
  const { loading, error, payment } = paymentDetails;

  useEffect(() => {
    // fetching customer details payment details per id.
    if (!payment || payment._id !== paymentId) {
      dispatch(listCustomerDetails(customerId));
      dispatch(getPaymentDetails(paymentId, customerId));
    }
  }, [dispatch, payment, paymentId, customerId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Payment ID: {paymentId}</h1>
      <Row>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <p>
                <strong>Name: </strong> {payment.customer.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${payment.customer.email}`}>
                  {payment.customer.email}
                </a>
              </p>
              <p>
                <strong>Mobile: </strong> {payment.customer.mobile}
              </p>
              <p>
                <strong>For Property:</strong>
                {payment?.customer?.properties[0]?.location?.address},{" "}
                {payment?.customer?.properties[0]?.location?.city} -{" "}
                {payment?.customer?.properties[0]?.location?.postalCode},{" "}
                {payment?.customer?.properties[0]?.location?.state},{" "}
                {payment?.customer?.properties[0]?.location?.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {payment?.paymentMethod}
              </p>
              {payment.isPaid ? (
                <Message variant="success">Paid on {payment.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={6}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>&#8377;{payment?.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PaymentDetailsScreen;
