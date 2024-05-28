export const getProducts = async () => {
  try {
    const productsAnswer = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/products/products`
    );
    const data = await productsAnswer.json();
    return data;
  } catch (error) {
    console.error("Error getting products", error);
    return [];
  }
};

export const createProduct = async (formData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/products/createProduct`,
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
      `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/category/category`
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
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/products/products/${productId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    return null;
  }
};

export const searchProducts = async (searchTerm) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/products/search?term=${searchTerm}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error searching products for term "${searchTerm}":`, error);
    return [];
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/products/byCategory/${categoryId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      `Error fetching products for category with ID ${categoryId}:`,
      error
    );
    return [];
  }
};

export const getCategoryById = async (categoryId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/category/category/${categoryId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching category with ID ${categoryId}:`, error);
    return null;
  }
};

export const createPayment = async (paymentData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/products/payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      return { success: true, id: responseData.id };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.error };
    }
  } catch (error) {
    console.error("Error al crear el pago:", error);
    return { success: false, error: "Error al crear el pago" };
  }
};

