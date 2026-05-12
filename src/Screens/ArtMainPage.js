

import NavBar from '../Components/NavBar';
import '../styles/ArtMainPageStyles.css';
import ProductsPage from './ProductsPage';

function ArtMainPage() {
    return (
        <div className="art-main-page">
            <h1>Welcome to the Keerthi ArtWorks</h1>
            <p>Explore our collection of beautiful artworks and discover your next masterpiece.</p>
            {/* <button  type="button" className="explore-button"    onClick={() => navigate('/products')}>Explore Artworks</button> */}
        <NavBar/>
        <ProductsPage/>

        </div>
    );
}

export default ArtMainPage;