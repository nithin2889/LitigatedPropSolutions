import express from "express";
import dotenv from "dotenv";
import customers from "./data/customers.js";

// configuring to read environment variables from .env file
dotenv.config();

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
const port = process.env.PORT || 5000;
const mode = process.env.NODE_ENV;
app.listen(port, console.log(`Server running in ${mode} mode on port ${port}`));
