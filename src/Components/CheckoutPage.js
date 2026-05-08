import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import '../styles/cartPageStyles.css';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://127.0.0.1:5000';

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems = [], clearCart } = useContext(CartContext);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const subtotal = cartItems.reduce((s, it) => s + (it.price * (it.quantity || 1)), 0);
  const total = subtotal + 100; // shipping

  useEffect(() => {
    if (cartItems.length === 0 && !success) navigate('/cart');
  }, [cartItems, success, navigate]);

  const pollPaymentStatus = async (paymentId) => {
    const maxAttempts = 20;
    const intervalMs = 2000;
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const resp = await fetch(`${API_BASE}/api/phnpay/status?paymentId=${encodeURIComponent(paymentId)}`);
        if (!resp.ok) throw new Error('status fetch failed');
        const json = await resp.json();
        if (json.status === 'SUCCESS') return true;
        if (json.status === 'FAILED') return false;
      } catch (e) {
        // ignore and retry
      }
      await new Promise((r) => setTimeout(r, intervalMs));
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !address || !city || !pincode) {
      setError('Please fill shipping address.');
      return;
    }
    if (paymentMethod === 'card' && (!cardNumber || !expiry || !cvv)) {
      setError('Please fill card details.');
      return;
    }
    if (paymentMethod === 'upi' && !upiId) {
      setError('Please enter UPI ID.');
      return;
    }

    setProcessing(true);

    try {
      if (paymentMethod === 'upi') {
        // Initiate phnpay on backend (mock or real)
        const resp = await fetch(`${API_BASE}/api/phnpay/initiate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: total, upiId }),
        });

        if (!resp.ok) {
          const text = await resp.text().catch(() => null);
          throw new Error(text || 'Payment initiation failed');
        }

        const data = await resp.json();
        const { paymentId, paymentUrl } = data;
        if (!paymentId || !paymentUrl) throw new Error('Invalid phnpay response');

        const win = window.open(paymentUrl, '_blank');
        if (!win) throw new Error('Unable to open payment window. Please allow popups.');

        const ok = await pollPaymentStatus(paymentId);
        if (!ok) throw new Error('Payment failed or timed out');

        setSuccess(true);
        if (typeof clearCart === 'function') clearCart();
      } else {
        // Razorpay flow (create order on backend then open checkout)
        const createResp = await fetch(`${API_BASE}/api/razorpay/create-order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: total }),
        });
        if (!createResp.ok) {
          const txt = await createResp.text().catch(() => null);
          throw new Error(txt || 'Create order failed');
        }
        const { orderId, amount: orderAmount, currency, keyId } = await createResp.json();

        if (!window.Razorpay) {
          await new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = 'https://checkout.razorpay.com/v1/checkout.js';
            s.onload = resolve;
            s.onerror = reject;
            document.body.appendChild(s);
          });
        }

        const options = {
          key: keyId || process.env.REACT_APP_RZP_KEY_ID,
          amount: orderAmount, // paise
          currency: currency || 'INR',
          name: 'KV Creations',
          description: 'Order payment',
          order_id: orderId,
          prefill: { name, contact: upiId || '' },
          handler: async function (response) {
            try {
              const verifyResp = await fetch(`${API_BASE}/api/razorpay/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(response),
              });
              if (!verifyResp.ok) {
                const err = await verifyResp.json().catch(() => ({}));
                setError(err.error || 'Payment verification failed');
                return;
              }
              setSuccess(true);
              if (typeof clearCart === 'function') clearCart();
            } catch (err) {
              console.error(err);
              setError('Verification request failed');
            }
          },
          theme: { color: '#F37254' },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Payment error');
    } finally {
      setProcessing(false);
    }
  };

  if (success) {
    return (
      <div className="checkout-page">
        <h2>Order placed successfully</h2>
        <p>Thank you — your order is on the way.</p>
        <button onClick={() => navigate('/')}>Continue</button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Shipping Address</h2>
        <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
        <input placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />

        <h3>Payment (₹{total})</h3>
        <label>
          <input type="radio" name="pm" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
          Card
        </label>
        <label>
          <input type="radio" name="pm" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
          UPI (phnpay)
        </label>

        {paymentMethod === 'card' ? (
          <>
            <input placeholder="Card number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
            <input placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
            <input placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} />
          </>
        ) : (
          <input placeholder="UPI ID (example@upi)" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
        )}

        {error && <div className="error">{error}</div>}

        <div className="checkout-actions">
          <button type="button" onClick={() => navigate(-1)} disabled={processing}>
            Cancel
          </button>
          <button type="submit" disabled={processing}>
            {processing ? 'Processing...' : `Pay ₹${total}`}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutPage;