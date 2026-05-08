import '../styles/ProductsPageStyles.css';
import ProductCommonGrid from '../Components/ProductCommonGrid';
import sunrisersImage from '../assets/Sunrisers1.png';
import swansImage from '../assets/swans.png';
import treeImage from '../assets/tree.png';
import jaganathImage from '../assets/jaganath.png';

function ProsductsPage() {
    return (
        <div className="products-page">
            {/* <h1>Products Page</h1>
            <p>Welcome to the Products Page! Here you can find a variety of products to choose from.</p> */}
            <ProductCommonGrid 
                sunrisersImage={sunrisersImage} 
                swansImage={swansImage} 
                treeImage={treeImage}
                janganathImage={jaganathImage}
            />
        </div>
    );
}

export default ProsductsPage;