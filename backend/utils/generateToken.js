import jwt from "jsonwebtoken";

const generateToken = (id) => {
  // Token generated with user id as the payload, secret key.
  // Signing a token with 1 hour of expiration.
  return jwt.sign(
    { exp: Math.floor(Date.now() / 1000) + 60 * 60, id },
    process.env.JWT_SECRET
  );
};

export default generateToken;
