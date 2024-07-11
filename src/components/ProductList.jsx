import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async(productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/products/${productId}`);
      getProducts();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="columns is-multiline">
          {products.map((product) => (
            <div className="column is-one-quarter" key={product.id}>
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={product.url} alt={`Image of ${product.name}`} />
                  </figure>
                </div>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{product.name}</p>
                    </div>
                  </div>
                </div>
                <footer className="card-footer">
                  <Link to={`/edit/${product.id}`} className="card-footer-item">Edit</Link>
                  <a className="card-footer-item" onClick={()=> deleteProduct(product.id)}>Delete</a>
                </footer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
