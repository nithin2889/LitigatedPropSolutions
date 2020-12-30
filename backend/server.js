import express from "express";
import customers from "./data/customers.js";

// initializing express
const app = express();

// allows us to access JSON data in the body.
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/customers", (req, res) => {
  res.json(customers);
});

app.get("/api/customers/:id", (req, res) => {
  const customer = customers.find((c) => c._id === req.params.id);
  res.json(customer);
});

// express server listening on port 5000
app.listen(
  5000,
  console.log("Server running in development mode on port 5000")
);
