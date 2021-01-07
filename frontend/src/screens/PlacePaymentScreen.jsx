import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { createPayment } from "../actions/paymentActions";
import { listCustomerDetails } from "../actions/customerActions";

const PlacePaymentScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const customerDetails = useSelector((state) => state.customerDetails);
  const { customer } = customerDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!userInfo && !userInfo?.isAdmin) {
    history.push("/login");
  }

  // fetching payment method from localstorage.
  const paymentMethod = JSON.parse(localStorage.getItem("paymentMethod"));

  // function to maintain 2 decimals at any given time.
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  // Calculating a fee of 2% of the property value.
  const totalPrice = addDecimals(
    Number(
      0.02 * customerDetails?.customer?.properties[0]?.propertyValue
    ).toFixed(2)
  );

  const paymentCreate = useSelector((state) => state.paymentCreate);
  const { payment, success, error } = paymentCreate;

  useEffect(() => {
    if (success) {
      history.push(`/payment/${payment._id}/customer/${match.params.id}`);
    }
    // eslint-disable-next-line
    // fetching customer details by customer id to avoid error on page refresh
    dispatch(listCustomerDetails(match.params.id));
  }, [dispatch, history, payment, success, match]);

  const paymentHandler = () => {
    dispatch(
      createPayment(match.params.id, {
        paymentMethod,
        totalPrice,
      })
    );
  };

  return (
    <>
      <Link
        className="btn btn-light my-3"
        to={`/payment/customer/${match.params.id}`}
      >
        Go Back
      </Link>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Customer: {customer?.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <p>
                <strong>Property Under Dispute:</strong>
                {customer?.properties[0]?.location?.address},{" "}
                {customer?.properties[0]?.location?.city} -{" "}
                {customer?.properties[0]?.location?.postalCode},{" "}
                {customer?.properties[0]?.location?.state},{" "}
                {customer?.properties[0]?.location?.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: {paymentMethod}</strong>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price</Col>
                  <Col>&#8377;{totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={customerDetails?.customer?.properties?.length === 0}
                  onClick={paymentHandler}
                >
                  Pay
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlacePaymentScreen;
