const { hash, compare } = require("bcryptjs");
import { verify } from "jsonwebtoken";

const hashPassword = async (pass) => {
  const hashedPassword = await hash(pass, 12);
  return hashedPassword;
};

const comparePassword = async (pass, hashedPassword) => {
  const isValid = await compare(pass, hashedPassword);
  return isValid;
};

const verifyToken = (token, secretKey) => {
  try {
    const result = verify(token, secretKey);
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};
export { hashPassword, comparePassword, verifyToken };
