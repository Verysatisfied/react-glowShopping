//domain/.netlify/functions/create-payment-intent
require("dotenv").config();
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  if (event.body) {
    try {
      const { cart, shipping_fee, total_amount } = JSON.parse(event.body);
      if (
        !cart ||
        typeof shipping_fee !== "number" ||
        typeof total_amount !== "number"
      ) {
        return {
          statusCode: 400, // Bad Request
          body: JSON.stringify({ error: "Invalid request data" }),
        };
      }
      const calculateOrderAmount = () => {
        return shipping_fee + total_amount;
      };
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
      });
      // Return the client secret to the Stripe component
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  } else {
    return {
      statusCode: 400, // Bad Request
      body: JSON.stringify({ error: "Missing request body" }),
    };
  }
};
