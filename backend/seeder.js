import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import customers from "./data/customers.js";
import User from "./models/userModel.js";
import Customer from "./models/CustomerModel.js";
import Property from "./models/PaymentModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Property.deleteMany();
    await Customer.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleCustomers = customers.map((customer) => {
      return { ...customer, user: adminUser };
    });

    await Customer.insertMany(sampleCustomers);

    console.log("Data Imported!".green.inverse);
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Property.deleteMany();
    await Customer.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  // node backend/seeder -d
  destroyData();
} else {
  // node backend/seeder
  importData();
}
