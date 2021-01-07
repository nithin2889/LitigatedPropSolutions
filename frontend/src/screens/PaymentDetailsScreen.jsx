import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, Card } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import moment from "moment";
import { getPaymentDetails, payOrder } from "../actions/paymentActions";
import axios from "axios";
import { PAYMENT_PAY_RESET } from "../constants/paymentConstants";

const PaymentDetailsScreen = ({ match, history }) => {
  const paymentId = match.params.id;
  const customerId = match.params.custId;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const paymentDetails = useSelector((state) => state.paymentDetails);
  const { loading, error, payment } = paymentDetails;

  const paymentPay = useSelector((state) => state.paymentPay);
  const { loading: loadingPay, success: successPay } = paymentPay;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!userInfo && !userInfo?.isAdmin) {
    history.push("/login");
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=INR`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    // we should be able to see the payment details even without paying.
    if (!payment || successPay || payment._id !== paymentId) {
      dispatch({ type: PAYMENT_PAY_RESET });
      dispatch(getPaymentDetails(paymentId, customerId));
    } else if (!payment.isPaid) {
      if (!window.paypal) {
        // checking if paypal script is present,
        // if not adds the above paypal script dynamically.
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, payment, paymentId, successPay, customerId]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(paymentId, paymentResult));
  };

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
                <Message variant="success">
                  Paid on {moment(payment.paidAt).format("YYYY-MM-DD")}
                </Message>
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
              {!payment.isPaid && (
                <ListGroup.Item>
                  {userInfo && userInfo.isAdmin && loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      currency="INR"
                      amount={payment.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PaymentDetailsScreen;
