export const fetchProductData = async (offset = 0, limit = 10) => {
    try {
      const response = await fetch(`/app/site/hosting/scriptlet.nl?script=1657&deploy=1&limit=${limit}&offset=${offset}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product data:', error);
      return [];
    }
  };
  

