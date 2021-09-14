const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");

const secret = "mysecretssshhhhhhh";
const expiration = "2h";
module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.header;
    if (req.header.authorization) {
      token = token.split(" ").pop().trim();
    }
    if (!token) {
      return req;
    }
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      throw new AuthenticationError("Incorrect Token");
    }
  },
  signToken: function ({ firstName, email, _id }) {
    const payload = { firstName, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};