const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const authJwt = require("./helpers/jwt");
const errorhandler = require("./helpers/error-handler");

require("dotenv/config");
const port = 3000;

const corsOptions = {
  origin: "*", // or specific domains ["http://localhost:3000"]
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

//Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

const api = process.env.APP_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(errorhandler)

// Connect to MongoDB
mongoose
  .connect(process.env.CONNECTION_STRING, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
