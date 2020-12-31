import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createProperty } from "../actions/customerActions.js";
import { CUSTOMER_CREATE_PROPERTY_RESET } from "../constants/customerConstants";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message.jsx";
import Loader from "../components/Loader.jsx";

const PropertyScreen = ({ match, history }) => {
  const customerId = match.params.id;

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [propertyValue, setPropertyValue] = useState(0);
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const customerCreateProperty = useSelector(
    (state) => state.customerCreateProperty
  );
  const {
    loading: loadingPropertyCreate,
    success: successPropertyCreate,
    error: errorPropertyCreate,
  } = customerCreateProperty;

  useEffect(() => {
    if (successPropertyCreate) {
      alert("Property created!");
      dispatch({ type: CUSTOMER_CREATE_PROPERTY_RESET });
      history.push(`/customer/${customerId}`);
    }
  }, [dispatch, successPropertyCreate, history, customerId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProperty(customerId, {
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
      })
    );
  };

  return (
    <>
      <Link className="btn btn-light my-3" to={`/customer/${match.params.id}`}>
        Go Back
      </Link>
      <FormContainer>
        <h2>Property Registration</h2>
        {loadingPropertyCreate && <Loader />}
        {errorPropertyCreate && (
          <Message variant="danger">{errorPropertyCreate}</Message>
        )}
        {userInfo ? (
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

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        ) : (
          <Message>
            Please <Link to="/login">sign in</Link> to create a property
          </Message>
        )}
      </FormContainer>
    </>
  );
};

export default PropertyScreen;
