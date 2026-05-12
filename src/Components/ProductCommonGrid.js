import ProductCard from './ProductCard';
import '../styles//ProductCardStyles.css';

function ProductCommonGrid({ sunrisersImage, swansImage, treeImage, janganathImage }) {
    const products = [
        {
            id: 1,
            image: sunrisersImage,
            name: 'Sunrisers Artwork',
            description: 'Beautiful sunrise painting with vibrant colors',
            price: 1099,
             soldOut: true
        },
        {
            id: 2,
            image: swansImage,
            name: 'Swans Artwork',
            description: 'Elegant swans with serene water backdrop',
            price: 1099,
             soldOut: true
        },
        {
            id: 3,
            image: treeImage,
            name: 'Tree of Life',
            description: 'Intricate tree design symbolizing growth and connection',
            price: 499,
             soldOut: false
        },
        {
            id: 4,
            image: janganathImage,
            name: 'Janganath Artwork',
            description: 'Traditional Janganath painting with rich cultural elements',
            price: 499,
                soldOut: false
        }
    ];

    // const handleAddToCart = (product) => {
    //     alert(`Added "${product.name}" (₹${product.price}) to cart!`);
    // };

    return (
        <div className="product-common-grid">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    image={product.image}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                     soldOut={product.soldOut}
                    // onAddToCart={handleAddToCart}
                />
            ))}
        </div>
    );
}

export default ProductCommonGrid;