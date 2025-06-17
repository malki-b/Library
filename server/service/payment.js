// paypalService.js
 process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const paypal = require('@paypal/checkout-server-sdk');
require('dotenv').config();

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

async function createOrder(amount) {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [{
      amount: {
        currency_code: "ILS",
        value: amount.toString()
      }
    }],
    application_context: {
      return_url: "http://localhost:5173/paypal-success",
      cancel_url: "http://localhost:5173/paypal-cancel"
    }
  });

  const order = await client.execute(request);
  return order.result.links.find(link => link.rel === "approve").href;
}

async function captureOrder(orderId) {
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});
  const capture = await client.execute(request);
  return capture.result;
}

module.exports = {
  createOrder,
  captureOrder
};
