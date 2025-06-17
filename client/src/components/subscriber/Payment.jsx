import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Nav from "./Nav"; // ודאי שהנתיב תואם למיקום הקובץ שלך
import { useState } from "react";

function Payment() {
  const [downloadReady, setDownloadReady] = useState(false);
  console.log("PayPal CLIENT ID:", import.meta.env.VITE_PAYPAL_CLIENT_ID);

  return (
    <>

      <Nav />
      <div style={{ height: "60px" }}></div>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2em' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>רכישת מנוי לספרייה</h2>
        <p style={{ marginBottom: '1em' }}>מחיר: ₪20</p>

        <PayPalScriptProvider
          options={{
            "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
            currency: "ILS",
          }}
        >
          <PayPalButtons
            style={{ layout: "vertical", color: "blue" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: "20.00",
                    },
                    description: "מנוי חודשי לספרייה",
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                //לשלוח מייל
                alert(`התשלום הצליח על ידי ${details.payer.name.given_name}!`);
                setDownloadReady(true);
              });
            }}
            onError={(err) => {
              console.error("שגיאה בתשלום:", err);
              alert("שגיאה במהלך התשלום");
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
              הורד את קובץ ההרשמה 📄
            </a>
          </div>
        )}
      </div>
    </>
  );
}

export default Payment;
