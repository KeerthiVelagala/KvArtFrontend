import { useNavigate } from 'react-router-dom';
import '../styles/ArtMainPageStyles.css';
import ProsductsPage from './ProductsPage';
function ArtMainPage() {
     const navigate = useNavigate();
    return (
        <div className="art-main-page">
            <h1>Welcome to the Keerthi ArtWorks</h1>
            <p>Explore our collection of beautiful artworks and discover your next masterpiece.</p>
            {/* <button  type="button" className="explore-button"    onClick={() => navigate('/products')}>Explore Artworks</button> */}
            <ProsductsPage/>
        </div>
    );
}

export default ArtMainPage;