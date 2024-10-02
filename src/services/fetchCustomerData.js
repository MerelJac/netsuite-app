export const fetchCustomerData = async (offset = 0, limit = 10) => {
  try {
    const response = await fetch(`/app/site/hosting/scriptlet.nl?script=1655&deploy=1&limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch customer data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching customer data:', error);
    return [];
  }
};
