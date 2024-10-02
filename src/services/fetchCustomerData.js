export const fetchCustomerData = async () => {
  try {
    const token = 'c23d18d2da5ed79037efe0335886818cd90a489f65103f4a6474430a8e957cbb';
    const response = await fetch('https://3519184.app.netsuite.com/app/site/hosting/scriptlet.nl?script=1655&deploy=1', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
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
