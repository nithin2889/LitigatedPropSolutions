import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {
  listCustomerDetails,
  updateCustomer,
} from "../actions/customerActions";
import { CUSTOMER_UPDATE_RESET } from "../constants/customerConstants";

const CustomerEditScreen = ({ match, history }) => {
  const customerId = match.params.id;

  const [name, setName] = useState("");
  const [dob, setDob] = useState(new Date());
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [adhaar, setAdhaar] = useState("");
  const [pan, setPan] = useState("");

  const dispatch = useDispatch();

  const customerDetails = useSelector((state) => state.customerDetails);
  const { loading, error, customer } = customerDetails;

  const customerUpdate = useSelector((state) => state.customerUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = customerUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CUSTOMER_UPDATE_RESET });
      history.push("/admin/customerlist");
    } else {
      if (!customer.name || customer._id !== customerId) {
        dispatch(listCustomerDetails(customerId));
      } else {
        setName(customer.name);
        setDob(moment(customer.dob).format("YYYY-MM-DD"));
        setEmail(customer.email);
        setMobile(customer.mobile);
        setAddress(customer.customerAddress.address);
        setCity(customer.customerAddress.city);
        setState(customer.customerAddress.state);
        setPostalCode(customer.customerAddress.postalCode);
        setCountry(customer.customerAddress.country);
        setAdhaar(customer.adhaar);
        setPan(customer.pan);
      }
    }
  }, [dispatch, history, customerId, customer, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCustomer({
        _id: customerId,
        name,
        dob,
        email,
        mobile,
        customerAddress: {
          address,
          city,
          state,
          postalCode,
          country,
        },
        adhaar,
        pan,
      })
    );
  };

  return (
    <>
      <Link to="/admin/customerlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Customer</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="dob">
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control
                type="date"
                format="yyyy-dd-mm"
                placeholder="Enter Date Of Birth"
                value={dob}
                onChange={(e) =>
                  setDob(moment(e.target.value).format("YYYY-MM-DD"))
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="mobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Postal Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="adhaar">
              <Form.Label>Adhaar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Adhaar Number"
                value={adhaar}
                onChange={(e) => setAdhaar(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="pan">
              <Form.Label>PAN</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter PAN Number"
                value={pan}
                onChange={(e) => setPan(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default CustomerEditScreen;
