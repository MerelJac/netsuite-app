import React, { useState, useEffect } from 'react';
import { fetchCustomerData } from '../services/fetchCustomerData';
function CustomerData() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);  // Optional loading state
  const [error, setError] = useState(null);  // Optional error handling

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchCustomerData();  // Fetching customer data
        setCustomers(data);  // Update the state with fetched data
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
      <h1>Customer Data</h1>
      {loading && <p>Loading customer data...</p>}  {/* Show loading state */}
      {error && <p>{error}</p>}  {/* Show error message if there's an error */}
      {!loading && !error && customers.length > 0 ? (
        <ul>
          {customers.map((customer) => (
            <li key={customer.id}>{customer.name}</li>
          ))}
        </ul>
      ) : (
        !loading && !error && <p>No customers found.</p>
      )}
    </div>
  );
}

export default CustomerData;
