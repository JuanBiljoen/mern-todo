const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  const authHeader = req.headers[`authorization`];
  let authString = authHeader.split(" ");
  const token = authString[1];
  console.log("auth token", token);
  // const token = req.cookies.token;
  // console.log(token);
  if (!token) {
    res.status(403).send("Unauthorized user");
  }
  try {
    const data = jwt.verify(token);
    console.log(data);
    // if (!data) {
    //     res.status(403).send("Unauthorized access");
    // }
    next();
  } catch (err) {
    // res.status(403).send("Unauthorized user");
  }
  next();
};

module.exports = auth;
