import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import customers from "../customers";

const CustomerScreen = ({ match }) => {
  let customer = customers?.find((c) => c._id === match.params.id);
  console.log(
    "customer: ",
    customers.find((c) => c._id === match.params.id)
  );

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={5}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{customer?.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>Email: {customer?.email}</ListGroup.Item>
            <ListGroup.Item>Mobile: {customer?.mobile}</ListGroup.Item>
            <ListGroup.Item>
              Date Of Birth: {moment(customer?.dob).format("YYYY-MM-DD")}
            </ListGroup.Item>
            <ListGroup.Item>PAN: {customer?.pan}</ListGroup.Item>
            <ListGroup.Item>Adhaar: {customer?.adhaar}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={7}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                {customer?.properties?.length === 0 ? (
                  <>
                    <Row className="align-items-center">
                      <h2>No Properties Registered</h2>
                      <Col className="text-right">
                        <LinkContainer
                          to={`/admin/property/${match.params.id}`}
                        >
                          <Button className="my-3">
                            <i className="fas fa-plus"></i> Register Property
                          </Button>
                        </LinkContainer>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <h2>
                    Properties Under Litigation ({customer.numProperties})
                  </h2>
                )}
              </ListGroup.Item>
              {customer?.properties?.map((property) => (
                <>
                  <ListGroup.Item>
                    <Row>
                      <Col>Address:</Col>
                      <Col>
                        <strong>
                          {property?.location?.address},{" "}
                          {property?.location?.city},{" "}
                          {property?.location?.state},{" "}
                          {property?.location?.postalCode},{" "}
                          {property?.location?.country}
                        </strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <span>&#8377; </span>
                        <strong>{property.propertyValue} /- </strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col>Description:</Col>
                      <Col>
                        <p>{property.description}</p>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CustomerScreen;
