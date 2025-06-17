
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Nav from "./Nav";
import { useState } from "react";
import { Context } from "../general/Routers";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PUT, POST } from "../general/queries";

function Payment() {
  const [downloadReady, setDownloadReady] = useState(false);
  const [user, setUser] = useContext(Context);
  const amount = user.debt;
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  async function sendEmail() {
    try {
      const emailRequest = {
        recipient: user.email,
        subject: 'Payment was successful',
        message: `Hello ${user.name}, your debt to the library was paid successfully`,
      }
      await POST('http://localhost:3000/users/sendEmail', emailRequest);
      setMessage(prevMessage => ({ txt: `${prevMessage.txt}\nThe email was sent successfully`, className: 'success' }));
    } catch (e) {
      setMessage(prevMessage => ({ txt: `${prevMessage.txt}\n ${e.message}`, className: 'error' }));
    }
  }

  const handlePaymentApprove = async (details) => {
    setMessage({ txt: `Payment was succeeded by ${details.payer.name.given_name}!`, className: 'success' });
    await sendEmail();
    await PUT(`http://localhost:3000/users/${user.id}/debt`, { amount: -1 * amount });
    setUser(prev => ({ ...prev, debt: prev.debt - amount }));
    setDownloadReady(true);
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: `${amount}.00`,
          },
          description: "pay your debt to the library",
        },
      ],
    });
  };

  return (
    <div className="page backgroundColorPage">
      {user == null && navigate('/home')}
      <Nav />
      {message && <div className={message.className}>
                        <span >{message.txt}</span>
                        <button className={message.className} onClick={() => setMessage(null)}>ok</button>
                    </div>}
      {
        user.debt <= 0 ?
          <h2 className="whiteText">You have no debt to the library</h2>
        :
          <>
            <div style={{ height: "60px" }}></div>
            <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2em' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Pay your debt to the library</h2>
              <p style={{ marginBottom: '1em' }}>debt: {user.debt}₪</p>

              <PayPalScriptProvider
                options={{
                  "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
                  currency: "ILS",
                }}
              >
                <PayPalButtons
                  style={{ layout: "vertical", color: "blue" }}
                  createOrder={createOrder}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then(handlePaymentApprove);
                  }}
                  onError={(err) => {
                    setMessage({ txt: `Error in payment: ${err}`, className: 'error' });
                  }}
                />
              </PayPalScriptProvider>

              {downloadReady && (
                <div style={{ marginTop: '2em', textAlign: 'center' }}>
                  <a
                    href="/path/to/download/file.pdf"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    download
                  >
                    download payment file📄
                  </a>
                </div>
              )}
            </div>
          </>
      }
    </div>
  );
}

export default Payment;
