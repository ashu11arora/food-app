const jwt = require("jsonwebtoken");

const verifytoken = (req, res, next) => {
  // console.log(req.headers.authorization);
  if (!req.headers.authorization) {//if token nhi mila req ke ander
    return res.status(401).send({ message: "unauthorised access" });
  }
  const token = req.headers.authorization.split(" ")[1];//split to take the actual token  from the second part of response
  // console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "token is invalid" });
    }
    req.decoded = decoded;//when req.decoded = decoded; is executed, it means that the decoded payload containing user information or metadata is assigned to the req.decoded property.
    next();
  });
};

module.exports = verifytoken;
