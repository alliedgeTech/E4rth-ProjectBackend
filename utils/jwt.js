// utils/jwt.js
const jwt = require("jsonwebtoken");

/** Generate JWT Token */
const generateJwtToken = (payload, expiresIn = process.env.JWT_EXPIRES_IN) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

/** Verify JWT Token */
const verifyJwtToken = (token) => {
  return new Promise((resolve, reject) => {
    if (typeof token !== "string" || !token) {
      return reject(new Error("Invalid token format"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};

module.exports = {
  generateJwtToken,
  verifyJwtToken,
};
