const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv/config');

app.use(cors());
app.options("*", cors());

// middleware
app.use(express.json());
app.use(morgan("tiny"));
// app.use(authJwt());
// app.use(errorHandler);

// Routes
// const categoriesRoutes = require("./routes/categories");
// const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
// const ordersRoutes = require("./routes/orders");

const api = process.env.API_URL;
const port = 3000 || process.env.port;

// app.use(`${api}/categories`, categoriesRoutes);
// app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
// app.use(`${api}/orders`, ordersRoutes);

// Database
mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "eshop-database",
    })
    .then(() => {
        console.log("Database Connection Success...");
    })
    .catch((err) => {
        console.log(err);
    });

// Server
app.listen(port, () => {
  console.log(`server is running http://localhost:${port}`);
});
