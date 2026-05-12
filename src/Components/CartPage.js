import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/cartPageStyles.css';

function CartPage() {
    const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
    const navigate = useNavigate();

    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handlePlaceOrder = () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        // redirect to checkout page to collect address & payment
        navigate('/checkout');
    };

    return (
        <div className="cart-page">
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <button onClick={() => navigate('/')} className="continue-shopping-btn">
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div className="cart-container">
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.name} className="cart-item">
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p>₹{item.price}</p>
                                </div>
                                <div className="item-quantity">
                                    <button onClick={() => updateQuantity(item.name, item.quantity - 1)}>−</button>
                                    <input type="number" value={item.quantity} readOnly />
                                    <button onClick={() => updateQuantity(item.name, item.quantity + 1)}>+</button>
                                </div>
                                <div className="item-total">
                                    <p>₹{item.price * item.quantity}</p>
                                </div>
                                <button 
                                    className="remove-btn"
                                    onClick={() => removeFromCart(item.name)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>Order Summary</h2>
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>₹{totalPrice}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>₹1</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>₹{totalPrice + 100}</span>
                        </div>
                        <button className="place-order-btn" onClick={handlePlaceOrder}>
                            Place Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;