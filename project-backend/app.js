const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

//routes
const itemRoute = require("./Routes/itemRoute");
const loginRoute = require("./Routes/loginRoute");
const registerRoute = require("./Routes/registerRoute");
const reviewRoute = require("./Routes/reviewRoute");

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("DB Connected");
    })
    .catch((e) => {
        console.error("error", e);
    });


app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/items",itemRoute);
app.use("/reviews", reviewRoute);

app.listen(process.env.PORT, () => {
    console.log("App is runnning in: ", process.env.PORT);
});
