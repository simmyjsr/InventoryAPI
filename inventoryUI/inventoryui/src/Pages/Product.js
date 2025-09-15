import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../Components/Model';
import ProductForm from '../Components/ProductForm';
import ProductCard from '../Components/ProductCard';
import SearchBar from '../Components/SearchBar';
import useProduct  from '../API/hooks/useProduct';  
const Product = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    // Using the custom hook to fetch products  
const { fetchProduct } = useProduct();
const { searchProduct } = useProduct();  
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                //const response = await axios.get('https://localhost:44390/api/Product/AllProduct');
                const response = await fetchProduct();
console.log(response,'product');
                if (response.status === 200) {
                    
                    setProducts(response.data);
                    setFilteredProducts(response.data);
                } else {
                    toast.error(`Unexpected response: ${response.status}`);
                }
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 401) {
                        toast.error('Unauthorized access. Please log in.');
                    } else if (error.response.status === 500) {
                        toast.error('Server error. Please try again later.');
                        
                    } else {
                        toast.error(`Error ${error.response.status}: ${error.response.statusText}`);
                    }
                } else {
                    toast.error('Failed to connect to the server.');
                    console.log(error);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredProducts(products);
        } else {
            searchProduct(searchTerm)
                .then(response => {
                    if (response.status === 200) {
                        setFilteredProducts(response.data);
                    } else {
                        toast.warn(`Unexpected status: ${response.status}`);
                    }
                })
                .catch(error => {
                    toast.error('Error searching products.');
                });
        }
    }, [searchTerm, products]);

    // To fix unauthorized error, you need to pass the authentication token with your API requests.
    // Update your ProductService to include the token in the headers.
    // Example for axios:
    //
    // const token = localStorage.getItem('token'); // or wherever you store your token
    // axios.get(url, { headers: { Authorization: `Bearer ${token}` } })

    return (
        <div className="product-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Products</h1>
                <button
                    className="add-button"
                    style={{
                        padding: '10px 15px',
                        backgroundColor: 'oklch(60% 0.118 184.704)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                    onClick={() => setShowModal(true)}
                >
                    Add Product
                </button>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <ProductForm onClose={() => setShowModal(false)} />
                </Modal>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>

            {isLoading ? (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <p>Loading products...</p>
                </div>
            ) : filteredProducts.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <p>No products found.</p>
                </div>
            ) : (
                <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', padding: '20px' }}>
                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product.productID}
                            product={{
                                ...product,
                                price: `₹${parseFloat(product.price).toFixed(2)}`
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Product;
