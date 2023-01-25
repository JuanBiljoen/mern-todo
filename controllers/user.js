const User = require("../model/userSchema");
const {
  checkemail,
  checkpassword,
} = require("../middlewares/RegisterInitialChecks");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  console.log(req.body);
  const { name, email, password, confirmpassword } = req.body;
  if (
    !email ||
    !name ||
    !password ||
    !confirmpassword ||
    checkemail(email) === false ||
    checkpassword(password) === false
  )
    return res.status(400).send({ msg: "Invalid credentials" });

  try {
    const userexists = await User.findOne({ email: email });
    if (userexists) {
      return res.status(400).json({ error: "user already exists" });
    } else if (password !== confirmpassword) {
      return res.status(400).json({ error: "Password didn't match" });
    }
    const user = new User({
      name,
      email,
      password,
      confirmpassword,
    });
    //middleware goes here to hash the password before storing in database
    user
      .save()
      .then(() => {
        res.send("User registered successfully");
      })
      .catch((err) => console.log(err));
  } catch (err) {
    res.send("Internal server error");
  }
};

exports.login = async (req, res) => {
  payload = {
    email: req.body.email,
    password: req.body.password,
    admin: false,
  };
  const token = jwt.sign(JSON.stringify(payload), "jwt-secret", {
    algorithm: "HS256",
  });
  // const userexists = await User.find({ email: req.body.email }, (err, data) => {
  //   //run if statement to check error, if error we log it
  //   //if user is found, continue with log in
  //   if (err) {
  //     console.log("ERR", err);
  //   } else {
  //     console.log(data);
  //   }
  // });
  // if (!userexists) {
  //   return res.status(400).json({ error: "user already exists" });
  // } else if (password !== confirmpassword) {
  //   return res.status(400).json({ error: "Password didn't match" });
  // }
  //console.log("token", token);

  //const { email, password } = req.body;
  // console.log(req.body);
  // if (!email || !password || !checkemail(email) || !checkpassword(password)) {
  //   res.status(400).json({ msg: "Invalid credentails" });
  // }
  console.log(req.body.email);
  User.find({ email: req.body.email }, (err, data) => {
    // const verifypassword = bcrypt.compare(password, user.password);
    console.log(data);
    console.log("err", err);
    if (!err) {
      res.send({ data: data, token: token });
    } else {
      res.send("ERROR:", err);
    }
  });
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).send("User logged out");
};
