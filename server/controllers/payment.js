const paypalService = require('../services/paypalService');
const db = require('../../db/db.js');
const paypalController = {
  createPayment: async (req, res) => {
    try {
      const { amount } = req.body;
      const approvalUrl = await paypalService.createOrder(amount);
      res.json({ approvalUrl });
    } catch (err) {
      console.error("PayPal create error:", err);
      res.status(500).json({ error: "שגיאה ביצירת תשלום" });
    }
  },

 // ודאי שיש לך חיבור למסד

capturePayment: async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const userId = req.user.id;
    const { lectureId } = req.body;

    const capture = await paypalService.captureOrder(orderId);

    if (lectureId) {
      await db.query(
        'INSERT INTO purchases (user_id, lecture_id) VALUES (?, ?)',
        [userId, lectureId]
      );
    }

    res.json({ success: true, capture });
  } catch (err) {
    console.error("PayPal capture error:", err);
    res.status(500).json({ error: "PayPal capture failed" });
  }
}

};

module.exports = paypalController;
