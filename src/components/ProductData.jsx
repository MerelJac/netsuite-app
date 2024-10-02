import React, { useState, useEffect } from 'react';
import { fetchProductData } from '../services/fetchProductData';
function ProductData() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // Optional loading state
  const [error, setError] = useState(null);  // Optional error handling

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchProductData();  // Fetching customer data
        setProducts(data);  // Update the state with fetched data
      } catch (err) {
        setError('Failed to fetch customer data.');
      } finally {
        setLoading(false);  // Set loading to false once data is fetched
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h1>Product Data</h1>
      {loading && <p>Loading customer data...</p>}  {/* Show loading state */}
      {error && <p>{error}</p>}  {/* Show error message if there's an error */}
      {!loading && !error && products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <>
                <li key={product.id}>{product.name}</li>
                <li>{product.price}</li>
                <li>{product.sku}</li>
                <li>{product.details}</li>
            </>
          ))}
        </ul>
      ) : (
        !loading && !error && <p>No products found.</p>
      )}
    </div>
  );
}

export default ProductData;
