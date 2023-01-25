const Todo = require("../model/todoSchema");
const jwt = require("jsonwebtoken");
const { findOneAndUpdate } = require("../model/todoSchema");
const User = require("../model/userSchema");

exports.create = (req, res) => {
  console.log(req.body.todo);
  //console.log(req.query.todo);
  const getToken = req.headers["authorization"].split(" ")[1];
  // const getToken = req.headers["Authorization"];
  const modifyToken = getToken.split(" ")[1];
  const decode = jwt.verify(getToken, "jwt-secret");
  //console.log("decode", decode);
  //console.log("todo from req.body", req.body.todo);
  //console.log("email from req.body",  req.body.email);

  //
  User.findOneAndUpdate(
    {
      email: req.body.email,
    },
    { $addToSet: { todo: req.body.todo } },
    { new: true },
    (err, data) => {
      console.log("err", err);
      console.log("data", data);
      if (err) {
        console.log("ERROR", err);
      } else {
        res.send(data);
        console.log(data);
      }
    }
  );
};

exports.remove = (req, res) => {
  console.log("remove a todo");
  // const todo = req.body.todo.todo;
  // const { email } = req.body;

  const getToken = req.headers["authorization"].split(" ")[1];
  // const getToken = req.headers["Authorization"];
  const modifyToken = getToken.split(" ")[1];
  const decode = jwt.verify(getToken, "jwt-secret");
  //
  //console.log("todo req.body:", todo);
  console.log("to be removed ", req.body.todo);
  User.findOneAndUpdate(
    {
      email: req.body.email,
    },
    { $pull: { todo: req.body.todo } },
    { new: true },
    (err, data) => {
      if (err) {
        console.log("ERROR", err);
      } else {
        res.send([data]);
        console.log(data);
      }
    }
  );
};

exports.view = async (req, res) => {
  console.log("view todo");
  try {
    const userid = req.cookies.uid;
    const user = await User.find({ tid: userid });
    // console.log(user);
    let todos = [];
    user.map((items) => {
      todos.push(items.todo);
    });
    // console.log(todos);
    res.status(200).send(todos);
  } catch (err) {
    res.status(500).send("something went wrong");
    console.log(err);
  }
};
