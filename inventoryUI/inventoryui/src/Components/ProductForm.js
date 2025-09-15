
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SearchableDropdown from '../Components/SearchableDropdown';
import  useCategory  from '../API/hooks/useCategory'
import useProduct from '../API/hooks/useProduct';
import useSupplierApi from '../API/hooks/useSupplierApi'; 


const ProductForm = ({ initialData,onClose }) => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [suppliers, setsuppliers] = useState([]);
    const [supplier, setSupplier] = useState(null);
    const [brands, setbrands] = useState([]);
    const [brand, setBrand] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    
    const { fetchCategory } = useCategory();
    const { fetchBrand } = useProduct();
      const { createProduct } = useProduct();
    const { fetchSupplier } = useSupplierApi();
    //form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        let imageUrl = '';
        // Temporary mock, replace with uploaded URL
        const formData = new FormData(e.target);
        formData.append("categoryID", category?.value);
    formData.append("supplierID", supplier?.value);
    formData.append("brandID", brand?.value);
    formData.append("ImageFile", imageFile);
      
       try {
        // const apiCall = initialData
        //     ? updateProduct(initialData.productID, formData) // You need to implement this in your hook
        //     : createProduct(formData);
           // createProduct(formData)
               //apiCall .then(response => {
                createProduct(formData).then(response => {
                    console.log(response);
                    if (response.status === 200 && response.data.isError === false) {
                        toast.success('Product created successfully!');
                        onClose(); // Close the form after successful submission
                    } else {
                        toast.error(`${response.data.message}`);
                    }
                })
                .catch(error => {
                    if (error.response) {
                        toast.error(`Error ${error.response.status}: ${error.response.statusText}`);
                    } else {
                        toast.error('Failed to connect to the server.');
                    }
                });
        } catch (error) {
            console.error('Error creating product:', error);
            toast.error('Failed to create product. Please try again.');
        }

    };

// FOR Category LIST
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetchCategory();
                 console.log(response ,'responsetest');
               // const data = await response.json();
  
                const formattedCategories = response.map(cat => ({
                    value: cat.categoryID,
                    label: cat.categoryName
                }));   
                setCategories(formattedCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
    
        fetchCategories();
    }, []);   

    // FOR Supplier LIST
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await fetchSupplier();

                const formattedSuppliers= response.map(cat => ({
                    value: cat.supplierID,
                    label: cat.supplierName
                }));   
                setsuppliers(formattedSuppliers);
            } catch (error) {
                toast.error(`Error ${error.response.status}: ${error.response.statusText}`);
            }
        };
    
        fetchSuppliers();
    }, []);

     // FOR Brand LIST
     useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await fetchBrand();
                const formattedBrands= response.map(cat => ({
                    value: cat.brandID,
                    label: cat.name
                }));   
                setbrands(formattedBrands);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
    
        fetchBrands();
    }, []);

        

        return (
            <div className="product-form-container" style={{ maxWidth: '100%', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', position: 'relative' }}>
                <button className="close-button" onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', position: 'absolute', right: '20px', top: '20px', cursor: 'pointer' }}>
                    &times;
                </button>
                <h2 className="form-title" style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Product Form</h2>
                <form className="product-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {['Product Name*', 'Product Number'].map((label) => (
                        <div className="form-group" key={label} style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={{ marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>
                                {label.replace('*', '')}
                                {label.includes('*') && <span style={{ color: 'red' }}> *</span>}:
                            </label>
                            <input
                                type="text"
                                name={label.toLowerCase().replace(/\s/g, '').replace('*', '')}
                                required={label.includes('*')}
                                style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                    ))}

                    <div className="form-row" style={{ display: 'flex', gap: '15px' }}>
                        <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <label style={{ marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>
                                Feature:
                            </label>
                            <select name="feature" required style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                                {/* <option value="">Select Feature</option> */}
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <label style={{ marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>
                                Stock Quantity
                                <span style={{ color: 'red' }}> *</span>:
                            </label>
                            <input
                                type="number"
                                name="stockquantity"
                                required
                                style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                        <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <label style={{ marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>
                                Price (₹)
                                <span style={{ color: 'red' }}> *</span>:
                            </label>
                            <input
                                type="text"
                                name="price"
                                required
                                pattern="^\d+(\.\d{1,2})?$"
                                title="Please enter a valid price with up to two decimal places"
                                style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                    </div>

                    <div className="form-row" style={{ display: 'flex', gap: '15px' }}>
                        <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <label style={{ marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>
                                Category
                                <span style={{ color: 'red' }}> *</span>:
                            </label>
                    
                            <SearchableDropdown
    name="category"
    value={category}
    onChange={setCategory}
    options={categories}
    placeholder="Select Category"
    isRequired
/>


                        </div>
                        <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <label style={{ marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>
                                Supplier Name
                                <span style={{ color: 'red' }}> *</span>:
                            </label>
                            
                            <SearchableDropdown
    name="supplier"
    value={supplier}
    onChange={setSupplier}
    options={suppliers}
    placeholder="Select Supplier"
    isRequired
/>
                    
                        </div>
                        <div className="form-group" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <label style={{ marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>
                                Brand Name
                                <span style={{ color: 'red' }}> *</span>:
                            </label>
                            <SearchableDropdown
    name="brand"
    value={brand}
    onChange={setBrand}
    options={brands}
    placeholder="Select Brand"
    isRequired
/>
                        </div>
                    </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5px' }}>
                        <button style={{ color: 'red' }}>+ Add Brand</button>
                         
                    </div>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>
                            Description:
                        </label>
                        <textarea name="description" required rows="4" style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
                    </div>

                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>
                            Upload Image
                            <span style={{ color: 'red' }}> *</span>:
                        </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            required
                            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                            onChange={e => setImageFile(e.target.files[0])}
                        />
                    </div>

                    <button type="submit" className="submit-button" style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Submit
                    </button>
                </form>
            </div>
        );
};

export default ProductForm;
