const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 6001;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const crypto =require("crypto");

// console.log(process.env.ACCESS_TOKEN_SECRET);

// middlewares
app.use(cors());
app.use(express.json());

// mongodb configurations
//



  

// jwt authentication  (this code gives us a token )
app.post("/jwt", async (req, res) => {
  const user = req.body;
  //const ACCESS_TOKEN_SECRET = crypto.randomBytes(64).toString('hex');
  //console.log(ACCESS_TOKEN_SECRET);
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });
  res.send({ token });
});





// importing routes
const menuRoutes = require("./api/routes/menuRoutes");
const cartRoutes = require("./api/routes/cartRoutes");
const userRoutes = require("./api/routes/userRoutes");
const paymentRoutes = require("./api/routes/paymentRoute");
app.use("/menu", menuRoutes);
app.use("/carts", cartRoutes);
app.use("/users", userRoutes);
app.use("/payments", paymentRoutes);

// stripe payment routes

app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "inr",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});








app.listen(port,()=>{console.log(`app is running at port number ${port}`)});






mongoose.connect(process.env.MONGODB_URL,{

})
.then(()=>{console.log("DB connected successfully")})
.catch((err)=>{
  console.log("DB connection issues");
  console.error(err);
  process.exit(1);
});

