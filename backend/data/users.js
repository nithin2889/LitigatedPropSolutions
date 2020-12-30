import bcrypt from "bcryptjs";

const users = [
  {
    name: "Nithin Prasad",
    email: "nithin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Harsha B L",
    email: "harsha@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Prasad B L",
    email: "prasad@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
