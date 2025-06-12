// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; 
// function App()
//  {
//      return (
//          <PayPalScriptProvider options={{ "client-id": "YOUR_CLIENT_ID" }}>
//      <PayPalButtons createOrder={(data, actions) => { return actions.order.create(
//         { purchase_units:
//              [{ amount: { value: '0.01', // סכום התשלום 
//              }, }], }); }}
//               onApprove={(data, actions) =>
//                  { return 
//                     actions.order.capture().then((details) => { console.log('Transaction completed by ' + details.payer.name.given_name); // כאן תוכל לשלוח את הפרטים לשרת שלך 
//               }); }} /> </PayPalScriptProvider> ); }



















import Nav from "../manager/Nav"

function Payment(){
return(
    <>
    <Nav />
    <h1>payment</h1>
    </>
)
}
export default Payment

// import React, { useEffect } from "react";
// import Nav from "../manager/Nav";

// function Payment() {
//   useEffect(() => {
//     // טוען את ה-SDK של PayPal
//     const script = document.createElement("script");
//     script.src = "https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"; // החלף ב-YOUR_CLIENT_ID שלך
//     script.async = true;
//     script.onload = () => {
//       window.paypal.Buttons({
//         createOrder: async function (data, actions) {
//           const response = await fetch('/create-order', {
//             method: 'post',
//             headers: {
//               'Content-Type': 'application/json'
//             }
//           });
//           const orderData = await response.json();
//           return orderData.id;
//         },
//         onApprove: async function (data, actions) {
//           const response = await fetch(`/capture-order/${data.orderID}`, {
//             method: 'post',
//             headers: {
//               'Content-Type': 'application/json'
//             }
//           });
//           const captureData = await response.json();
//           console.log('Capture result', captureData);
//           alert('Transaction completed!');
//         }
//       }).render('#paypal-button-container'); // מיקום כפתור PayPal
//     };
//     document.body.appendChild(script);
//   }, []);

//   return (
//     <>
//       <Nav />
//       <h1>Payment</h1>
//       <div id="paypal-button-container"></div> {/* מיקום כפתור PayPal בדף */}
//     </>
//   );
// }

// export default Payment;


///////////
// const paypal = require('@paypal/checkout-server-sdk');

// function environment() {
//   return new paypal.core.SandboxEnvironment('YOUR_CLIENT_ID', 'YOUR_CLIENT_SECRET'); // השתמש ב-Sandbox עבור בדיקות
// }

// function client() {
//   return new paypal.core.PayPalHttpClient(environment());
// }

// module.exports = { client };




// על מנת להתממשק למערכת גבייה עבור כרטיסי אשראי, תוכל להשתמש ב-API של מערכות גבייה פופולריות. אחת מהאפשרויות החינמיות והנפוצות היא Stripe, המספקת אפשרויות גישור להיבטי גבייה ומשלוחים.


// הנה תהליך כללי מה עליך לעשות:


// התקנת Stripe:

   
// התקן את חבילת stripe בפרויקט Node.js שלך:

// `bash

// npm install stripe

// `


// יצירת API endpoint לגבייה:

   
// קבע API endpoint בשרת Node.js שיטפל בתהליך הגבייה, לדוגמה:

// `javascript

// const express = require('express');

// const Stripe = require('stripe');

// const stripe = Stripe('YOUR_SECRET_KEY');

// const app = express();


// app.use(express.json());


// app.post('/create-checkout-session', async (req, res) => {

// const session = await stripe.checkout.sessions.create({

// payment_method_types: ['card'],

// line_items: [{

// price_data: {

// currency: 'usd',

// product_data: {

// name: 'Membership Fee',

// },

// unit_amount: 2000, // סכום ב-cent (20.00 דולר)

// },

// quantity: 1,

// }],

// mode: 'payment',

// success_url: 'https://example.com/success',

// cancel_url: 'https://example.com/cancel',

// });


// res.json({ id: session.id });

// });


// app.listen(3000, () => console.log('Server is running on port 3000'));

// `


// יצירת ממשק Frontend:

   
// ב-React, תוכל להוסיף כפתור שיקרא ל-endpoint שיצרת:

// `javascript

// import React from 'react';


// const Checkout = () => {

// const handleCheckout = async () => {

// const response = await fetch('/create-checkout-session', {

// method: 'POST',

// headers: {

// 'Content-Type': 'application/json',

// },

// });

// const session = await response.json();

// const stripe = window.Stripe('YOUR_PUBLISHABLE_KEY');

// await stripe.redirectToCheckout({ sessionId: session.id });

// };


// return (

// <button role="link" onClick={handleCheckout}>

// Pay Now

// </button>

// );

// };


// export default Checkout;

// `


// הגדרות נוספות:

   
// ודא שהגדרת את ה-Webhooks והצגת את המידע על התשלומים בהצלחה.


// בדוק את התהליך:

   
// השתמש במצב בדיקה של Stripe כדי לבדוק את תהליך הגבייה עם מספרי כרטיסים לדוגמה שסופקו על ידיהם.


// עליך להתייחס לתיעוד של Stripe כדי להבין את ההגדרות הנדרשות עבורך ולוודא שהכל עובד כראוי.