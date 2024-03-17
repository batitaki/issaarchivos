const fetchMedia = async () => {
    try {
      const response = await fetch("http://localhost:3002/media/media");
      if (!response.ok) {
        throw new Error("Error fetching media");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching media:", error);
      throw error; 
    }
  };
  
  const getMediaByProduct = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3002/media/byProduct/${productId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        `Error fetching media for product with ID ${productId}:`,
        error
      );
      return [];
    }
  };
  
  const uploadMedia = async (formDataWithFile) => {
    try {
      const response = await fetch("http://localhost:3002/media/upload", {
        method: "POST",
        body: formDataWithFile,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Media uploaded successfully:", data);
        return { success: true, data };
      } else {
        console.error("Error uploading media");
        return { success: false, error: "Error uploading media" };
      }
    } catch (error) {
      console.error("Error uploading media:", error);
      return { success: false, error: "Error uploading media" };
    }
  };
  
  export { fetchMedia, uploadMedia, getMediaByProduct};
  