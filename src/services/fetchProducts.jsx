export const getProducts = async () => {
  try {
    const productsAwnser = await fetch(
      "http://localhost:3002/products/products"
    );
    const data = await productsAwnser.json();
    return data;
  } catch (error) {
    console.error("Error getting products", error);
    return [];
  }
};

export const createProduct = async (formData) => {
  try {
    const response = await fetch(
      "http://localhost:3002/products/createProduct",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      return { success: true, message: responseData.message };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.error };
    }
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
    return { success: false, error: "Error al enviar la solicitud" };
  }
};

export const getCategory = async () => {
  try {
    const categoryResponse = await fetch(
      "http://localhost:3002/products/category"
    );
    const data = await categoryResponse.json();
    return data;
  } catch (error) {
    console.error("Error getting categories", error);
    return [];
  }
};


export const getProductById = async (productId) => {
  try {
    const response = await fetch(`http://localhost:3002/products/products/${productId}`); 
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    return null; 
  }
};
