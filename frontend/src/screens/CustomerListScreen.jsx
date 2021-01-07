import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  createCustomer,
  deleteCustomer,
  listCustomers,
} from "../actions/customerActions";
import { CUSTOMER_CREATE_RESET } from "../constants/customerConstants";

const CustomerListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const customerList = useSelector((state) => state.customerList);
  const { loading, error, customers } = customerList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const customerDelete = useSelector((state) => state.customerDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = customerDelete;

  const customerCreate = useSelector((state) => state.customerCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    customer: createdCustomer,
  } = customerCreate;

  useEffect(() => {
    dispatch({ type: CUSTOMER_CREATE_RESET });

    if (!userInfo && !userInfo?.isAdmin) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/admin/customer/${createdCustomer._id}/edit`);
    } else {
      dispatch(listCustomers());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdCustomer,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCustomer(id));
    }
  };

  const createCustomerHandler = () => {
    dispatch(createCustomer());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Customers</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createCustomerHandler}>
            <i className="fas fa-plus"></i> Create Customer
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>MOBILE</th>
                <th>ADDRESS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.mobile}</td>
                  <td>
                    {customer.customerAddress.address},{" "}
                    {customer.customerAddress.city},{" "}
                    {customer.customerAddress.state},{" "}
                    {customer.customerAddress.postalCode}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/customer/${customer._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(customer._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default CustomerListScreen;
