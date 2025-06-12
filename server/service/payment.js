// const express = require('express');
// const bodyParser = require('body-parser');
// const axios = require('axios'); // נשתמש ב-Axios לשליחת בקשות HTTP
// const app = express();

// app.use(bodyParser.json());

// app.post('/api/paypal/confirm', async (req, res) => {
//   const { orderID } = req.body;

//   try {
//     // שלח בקשה ל-PayPal לאמת את התשלום
//     const response = await axios.get(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}`, {
//       headers: {
//         'Authorization': `Bearer YOUR_ACCESS_TOKEN`, // הכנס את ה-Access Token שלך
//       },
//     });

//     // בדוק אם התשלום אושר
//     if (response.data.status === 'COMPLETED') {
//       // כאן תוכל לשמור את פרטי העסקה במסד הנתונים שלך
//       res.status(200).json({ message: 'Transaction confirmed' });
//     } else {
//       res.status(400).json({ message: 'Transaction not completed' });
//     }
//   } catch (error) {
//     console.error('Error confirming transaction:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
