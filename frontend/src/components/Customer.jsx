import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Customer = ({ customer }) => {
  return (
    <Link to={`/customer/${customer._id}`}>
      <Card.Img variant="top" src="/images/nopic.jpg" />
      <Card className="my-3 p-3 rounded">
        <Card.Body>
          <Card.Title as="div">
            <span>{customer.name}</span>
          </Card.Title>
          <Card.Text as="div">
            <span>{customer.mobile}</span>
          </Card.Text>
          <Card.Text as="div">
            <span>{customer.numProperties} properties under dispute</span>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Customer;
