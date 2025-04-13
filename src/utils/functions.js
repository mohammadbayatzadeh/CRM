const { hash, compare } = require("bcryptjs");
import { verify } from "jsonwebtoken";

const helpers = {
  seperateName: (email) => {
    const array = email.split("@");
    return array[0];
  },
  isFormEmpty: (form) => {
    for (const key of Object.keys(form)) {
      if (typeof form[key] == 'string' && !form[key].trim()) return true;
    }
    return false;
  },
};

const hashPassword = async (pass) => {
  const hashedPassword = await hash(pass, 12);
  return hashedPassword;
};

const comparePassword = async (pass, hashedPassword) => {
  const isValid = await compare(pass, hashedPassword);
  return isValid;
};

const verifyToken = (token) => {
  const secretKey = process.env.SECRET_KEY;
  try {
    const result = verify(token, secretKey);
    return result;
  } catch (err) {
    return false;
  }
};
export { comparePassword, hashPassword, helpers, verifyToken };
