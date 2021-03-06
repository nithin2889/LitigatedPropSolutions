import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import customerRoutes from "./routes/customerRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

// configuring to read environment variables from .env file
dotenv.config();

// connecting to MongoDB
connectDB();

// initializing express
const app = express();

// middleware to intercept the requests in console
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// a middleware that allows us to access/parse JSON data in the request body.
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/customers", customerRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payment", paymentRoutes);

// Hit this route and fetch the client id
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound);
app.use(errorHandler);

// express server listening on port 5000
const port = process.env.PORT || 5000;
const mode = process.env.NODE_ENV;
app.listen(
  port,
  console.log(`Server running in ${mode} mode on port ${port}`.yellow.bold)
);
