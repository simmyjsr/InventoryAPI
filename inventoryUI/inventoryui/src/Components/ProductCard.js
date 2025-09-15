import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Modal from '../Components/Model';
import EditProductForm from '../Components/EditProductForm';
import SearchBar from '../Components/SearchBar';
import useProduct  from '../API/hooks/useProduct';
  
const ProductCard = ({ product }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div
            className="product-card"
            style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                backgroundColor: '#fff'
            }}
        >
            <img
                src={product.imageBase64}
                alt={product.productName}
                style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                }}
            />
            <h2 style={{ fontSize: '18px', margin: '10px 0', color: '#34495e' }}>{product.productName}</h2>
            <p style={{ margin: '5px 0', color: '#7f8c8d' }}>Price: ₹{product.price}</p>
            <p style={{ margin: '5px 0', color: '#7f8c8d' }}>Quantity: {product.stockQuantity}</p>
            <p style={{ margin: '5px 0', color: '#7f8c8d' }}>PWDNumber: {product.productNumber}</p>
            <button
                style={{
                    margin: '5px',
                    padding: '10px 15px',
                    backgroundColor: '#2ecc71',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
                onClick={handleEditClick}
            >
                <FaEdit />
            </button>
            <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                <EditProductForm onClose={handleModalClose}  initialData={product} />
            </Modal>
            <button
                style={{
                    margin: '5px',
                    padding: '10px 15px',
                    backgroundColor: '#e74c3c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                <FaTrash />
            </button>
        </div>
    );
};

export default ProductCard;
