import { useState ,useContext} from 'react';
import { CartContext } from '../Context/CartContext';
import '../styles/ProductCardStyles.css';
import { useNavigate } from 'react-router-dom'

function ProductCard({ image, name, description, price, onAddToCart,soldOut }) {
    const [showOverlay, setShowOverlay] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
     const [isAdding, setIsAdding] = useState(false); // << add this line
   const { addToCart } = useContext(CartContext);
   

    const galleryImages = [image, image, image, image];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    const navigate = useNavigate();
const handleAddToCart = async () => {

    if (soldOut) return;

    if (isAdding) return;

    setIsAdding(true);

    try {
        const product = { image, name, description, price };

        if (addToCart) {
            addToCart(product);
        }

        if (typeof onAddToCart === 'function') {
            onAddToCart(product);
        }

        navigate('/cart');

    } finally {
        setIsAdding(false);
    }
};

    return (
        <>
            <div className="product-card">
                {soldOut && (
    <div className="sold-out-badge">
        SOLD OUT
    </div>
)}
                <div className="product-image" onClick={() => setShowOverlay(true)}>
                    <img src={image} alt={name} style={{ cursor: 'pointer' }} />
                </div>
                <div className="product-info">
                    <h3>{name}</h3>
                    <p className="description">{description}</p>
                    <div className="product-footer">
                        <span className="price">₹{price}</span>
                      <button
    type='button'
    className={soldOut ? "sold-btn" : "add-to-cart-btn"}
    onClick={handleAddToCart}
    disabled={isAdding || soldOut}
>
    {soldOut ? "not available" : isAdding ? 'Adding...' : 'Add to Cart'}
</button>
                    </div>
                </div>
            </div>

            {showOverlay && (
                <div className="overlay" onClick={() => setShowOverlay(false)}>
                    <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setShowOverlay(false)}>✕</button>
                        <h2>{name}</h2>
                        <div className="gallery-carousel">
                            <button className="arrow-btn left-arrow" onClick={prevImage}>❮</button>
                            <div className="carousel-image-container">
                                <img src={galleryImages[currentImageIndex]} alt={`${name} ${currentImageIndex + 1}`} />
                            </div>
                            <button className="arrow-btn right-arrow" onClick={nextImage}>❯</button>
                        </div>
                        <div className="image-counter">{currentImageIndex + 1} / {galleryImages.length}</div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductCard;