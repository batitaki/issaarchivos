export const getProducts = async () => {
    try {
      const productsAwnser = await fetch('http://localhost:3002/products/products');
      const data = await productsAwnser.json();
      return data;
    } catch (error) {
      console.error('Error getting products', error);
      return [];
    } 
  };