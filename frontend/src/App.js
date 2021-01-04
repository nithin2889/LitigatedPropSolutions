import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import CustomerListScreen from "./screens/CustomerListScreen";
import CustomerEditScreen from "./screens/CustomerEditScreen";
import PropertyScreen from "./screens/PropertyScreen";
import CustomerScreen from "./screens/CustomerScreen";
import PropertyEditScreen from "./screens/PropertyEditScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} />
          <Route path="/customer/:id" component={CustomerScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/users/:id/edit" component={UserEditScreen} />
          <Route path="/admin/customerlist" component={CustomerListScreen} />
          <Route
            path="/admin/customer/:id/edit"
            component={CustomerEditScreen}
          />
          <Route path="/admin/property/:id" component={PropertyScreen} exact />
          <Route
            path="/admin/customer/:custId/property/:propId/edit"
            component={PropertyEditScreen}
          />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
