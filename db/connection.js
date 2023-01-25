const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://admin:admin@todocluster.qcbzynv.mongodb.net/todos?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connection with db successful");
  })
  .catch((err) => console.log(err));
