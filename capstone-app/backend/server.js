const express = require("express");
const app = express();

require("dotenv").config();
let dbConnect = require("./dbConnect");

let userRoutes = require("./routes/userRoutes");
let exerciseRoutes = require("./routes/exerciseRoutes")

const controllers = require("./controllers");

// parse requests of content-type -application/json
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my mini project : Valo Get." });
});


app.use("/api/users", userRoutes);
app.use("/api/exercises", exerciseRoutes)


// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);

});
