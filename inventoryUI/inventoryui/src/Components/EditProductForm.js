import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SearchableDropdown from '../Components/SearchableDropdown';
import useCategory from '../API/hooks/useCategory';
import useProduct from '../API/hooks/useProduct';
import useSupplierApi from '../API/hooks/useSupplierApi';

const EditProductForm = ({ initialData, onClose }) => {
  // State
  const [productName, setProductName] = useState('');
  const [productNumber, setProductNumber] = useState('');
  const [feature, setFeature] = useState('false');
  const [stockQuantity, setStockQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const [supplier, setSupplier] = useState(null);
  const [suppliers, setSuppliers] = useState([]);

  const [brand, setBrand] = useState(null);
  const [brands, setBrands] = useState([]);

  // Hooks
  const { fetchCategory } = useCategory();
  const { fetchBrand, createProduct, updateProductById } = useProduct();
  const { fetchSupplier } = useSupplierApi();

  // Pre-fill form if editing
  useEffect(() => {
    if (initialData) {
      setProductName(initialData.productName || '');
      setProductNumber(initialData.productNumber || '');
      setFeature(initialData.feature ? 'true' : 'false');
      setStockQuantity(initialData.stockQuantity || '');
      setPrice(initialData.price || '');
      setDescription(initialData.description || '');
      setCategory({ value: initialData.categoryID, label: initialData.categoryName });
      setSupplier({ value: initialData.supplierID, label: initialData.supplierName });
      setBrand({ value: initialData.brandID, label: initialData.brandName });
    }
  }, [initialData]);

  // Load dropdown data
  useEffect(() => {
    const fetchAllDropdowns = async () => {
      try {
        const [catRes, supRes, brandRes] = await Promise.all([
          fetchCategory(),
          fetchSupplier(),
          fetchBrand(),
        ]);

        setCategories(catRes.map(c => ({ value: c.categoryID, label: c.categoryName })));
        setSuppliers(supRes.map(s => ({ value: s.supplierID, label: s.supplierName })));
        setBrands(brandRes.map(b => ({ value: b.brandID, label: b.name })));
      } catch (err) {
        toast.error('Error loading dropdowns');
      }
    };

    fetchAllDropdowns();
  }, []);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productNumber', productNumber);
    formData.append('feature', feature);
    formData.append('stockQuantity', stockQuantity);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('categoryID', category?.value);
    formData.append('supplierID', supplier?.value);
    formData.append('brandID', brand?.value);
    if (imageFile) formData.append('ImageFile', imageFile);

    try {
      const apiCall = initialData
    
        ? updateProductById(initialData.productID, formData)
        : createProduct(formData);
        console.log(formData, 'apiCall formData' );
        console.log(initialData, 'apiCall initialData' );
console.log(apiCall, 'apiCall update product' );
      const response = await apiCall;
      console.log(response, 'responseupdate product' );
      if (response.status === 200 && response.data?.isError === false) {
        toast.success(`Product ${initialData ? 'updated' : 'created'} successfully!`);
        onClose();
      } else {
        toast.error(response.data.message || 'Operation failed');
      }
    } catch (error) {
      toast.error('Submission failed. Try again.');
    }
  };

  return (
    <div className="product-form-container" style={styles.container}>
      <button onClick={onClose} style={styles.closeButton}>&times;</button>
      <h2 style={styles.title}>Product Form</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <InputField label="Product Name" value={productName} onChange={setProductName} required />
        <InputField label="Product Number" value={productNumber} onChange={setProductNumber} />

        <div style={styles.row}>
          <SelectField label="Feature" value={feature} onChange={setFeature} options={[
            { value: 'true', label: 'Yes' },
            { value: 'false', label: 'No' },
          ]} required />

          <InputField label="Stock Quantity" value={stockQuantity} onChange={setStockQuantity} type="number" required />
          <InputField label="Price (₹)" value={price} onChange={setPrice} type="text" pattern="^\d+(\.\d{1,2})?$" required />
        </div>

        <div style={styles.row}>
          <DropdownField label="Category" value={category} onChange={setCategory} options={categories} required />
          <DropdownField label="Supplier Name" value={supplier} onChange={setSupplier} options={suppliers} required />
          <DropdownField label="Brand Name" value={brand} onChange={setBrand} options={brands} required />
        </div>

        <div>
          <button style={{ color: 'red' }}>+ Add Brand</button>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            style={styles.textarea}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Upload Image <span style={{ color: 'red' }}>*</span>:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            style={styles.input}
            required={!initialData}
          />
        </div>

        <button type="submit" style={styles.submitButton}>Save</button>
      </form>
    </div>
  );
};

// ================== Helper Components ==================

const InputField = ({ label, value, onChange, type = 'text', required = false }) => (
  <div style={styles.field}>
    <label style={styles.label}>{label}{required && <span style={{ color: 'red' }}> *</span>}:</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      //pattern={pattern}
      style={styles.input}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options = [], required = false }) => (
  <div style={styles.field}>
    <label style={styles.label}>{label}{required && <span style={{ color: 'red' }}> *</span>}:</label>
    <select value={value} onChange={(e) => onChange(e.target.value)} required={required} style={styles.input}>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

const DropdownField = ({ label, value, onChange, options = [], required = false }) => (
  <div style={{ ...styles.field, flex: 1 }}>
    <label style={styles.label}>{label}{required && <span style={{ color: 'red' }}> *</span>}:</label>
    <SearchableDropdown
      name={label.toLowerCase().replace(/\s/g, '')}
      value={value}
      onChange={onChange}
      options={options}
      placeholder={`Select ${label}`}
      isRequired={required}
    />
  </div>
);

// ================== Styles ==================

const styles = {
  container: {
    maxWidth: '100%', margin: '0 auto', padding: 20, border: '1px solid #ccc',
    borderRadius: 8, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', backgroundColor: '#fff',
    position: 'relative'
  },
  closeButton: {
    background: 'none', border: 'none', fontSize: 20, position: 'absolute', right: 20, top: 20, cursor: 'pointer'
  },
  title: {
    textAlign: 'center', marginBottom: 20, color: '#333'
  },
  form: {
    display: 'flex', flexDirection: 'column', gap: 15
  },
  field: {
    display: 'flex', flexDirection: 'column'
  },
  label: {
    marginBottom: 5, fontWeight: 'bold', color: '#555'
  },
  input: {
    padding: 10, border: '1px solid #ccc', borderRadius: 4
  },
  textarea: {
    padding: 10, border: '1px solid #ccc', borderRadius: 4
  },
  submitButton: {
    padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff',
    border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 'bold'
  },
  row: {
    display: 'flex', gap: 15
  }
};

export default EditProductForm;
