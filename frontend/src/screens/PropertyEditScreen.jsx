import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {
  listCustomerDetails,
  updateProperty,
} from "../actions/customerActions";
import { CUSTOMER_UPDATE_PROPERTY_RESET } from "../constants/customerConstants";

const PropertyEditScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const customerId = match.params.custId;

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [propertyValue, setPropertyValue] = useState(0);
  const [image, setImage] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const customerDetails = useSelector((state) => state.customerDetails);
  const { loading, error, customer } = customerDetails;

  const customerUpdateProperty = useSelector(
    (state) => state.customerUpdateProperty
  );
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = customerUpdateProperty;

  if (!userInfo && !userInfo?.isAdmin) {
    history.push("/login");
  }

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CUSTOMER_UPDATE_PROPERTY_RESET });
      history.push(`/customer/${customerId}`);
    } else {
      if (!customer.name || customer._id !== customerId) {
        dispatch(listCustomerDetails(customerId));
      } else {
        setAddress(customer?.properties[0]?.location.address);
        setCity(customer?.properties[0]?.location.city);
        setState(customer?.properties[0]?.location.state);
        setPostalCode(customer?.properties[0]?.location.postalCode);
        setCountry(customer?.properties[0]?.location.country);
        setDescription(customer?.properties[0]?.description);
        setPropertyValue(customer?.properties[0]?.propertyValue);
        setImage(customer?.properties[0]?.image);
      }
    }
  }, [dispatch, history, customer, customerId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProperty(customerId, {
        location: {
          address,
          city,
          state,
          postalCode,
          country,
        },
        description,
        propertyValue,
        image,
        user: user._id,
        customer: customerId,
      })
    );
  };

  return (
    <>
      <Link to={`/customer/${customerId}`} className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Property</h1>
        <Form.Group controlId="customer">
          <Form.Label>Customer: {customer?.name}</Form.Label>
        </Form.Group>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
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

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Property Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="propertyValue">
              <Form.Label>Property Value</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Property Value"
                value={propertyValue}
                onChange={(e) => setPropertyValue(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default PropertyEditScreen;
