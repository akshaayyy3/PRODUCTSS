import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
import Category from './Category';

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const getCategories = () => {
    axios.get('https://dummyjson.com/products/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Error fetching categories:', err));
  };

  const getAllProducts = () => {
    setLoading(true);
    axios.get('https://dummyjson.com/products')
      .then(res => setProducts(res.data.products))
      .catch(err => console.error('Error fetching products:', err))
      .finally(() => setLoading(false));
  };

  const getProductsByCategory = (category) => {
    setLoading(true);
    axios.get(`https://dummyjson.com/products/category/${category}`)
      .then(res => setProducts(res.data.products))
      .catch(err => console.error('Error fetching category products:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getAllProducts();
    getCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory !== '') {
      getProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <div className="app-container">
      <h2 className="title">Our Products</h2>
      <div className="main-content">
        <div className="sidebar">
          <Category categories={categories} setSelectedCategory={setSelectedCategory} />
        </div>
        <div className="product-list">
          {loading ? (
            <p>Loading products...</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductItem key={product.id} pdata={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductItem({ pdata }) {
  return (
    <div className="product-card">
      <img src={pdata?.thumbnail} alt={pdata?.title || 'Product'} className="product-img" />
      <h4>{pdata.title}</h4>
      <p>${pdata.price}</p>
    </div>
  );
}

export default App;
