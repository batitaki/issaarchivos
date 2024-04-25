import React, { useState, useEffect } from 'react';
import { createProduct, getCategory } from '../../services/fetchProducts.jsx';
import './FormStyles.css'

const CreateProduct = () => {
  const [registeredCategories, setRegisteredCategories] = useState([]);
  const [formData, setFormData] = useState({
    CategoryID: '',
    Name: '',
    Image: '',
    Price: '',
    Description: '',
  });
  const [categorySelected, setCategorySelected] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const categoryData = await getCategory();
      setRegisteredCategories(categoryData);
    };

    fetchData();
  }, []);

  const handleCategoryClick = (categoryID) => {
    setFormData({
      ...formData,
      CategoryID: categoryID,
    });
    setCategorySelected(true);
  };

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('formData before submission:', formData);
    const formDataToSubmit = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });

    const apiResponse = await createProduct(formDataToSubmit);

    if (apiResponse.success) {
      console.log(apiResponse.message);
      alert('Product created');
    } else {
      console.error('Error creating product:', apiResponse.error);
    }
  };

  return (
    <div className="my-container-form">
      <h3 className="form-title"> CREATE PRODUCT</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="my-form-form">
        {!categorySelected && (
          <div className="my-form-group-form">
            <label htmlFor="Category" className="my-label-form">
              SELECT CATEGORY
            </label>
            <ul className="category-list-create">
              {registeredCategories.map((category) => (
                <li key={category.ID} onClick={() => handleCategoryClick(category.ID)}>
                  {category.Name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {categorySelected && (
          <>
            <div className="my-form-group-form">
              <label htmlFor="Name" className="my-label-form">
                NAME
              </label>
              <input
                type="text"
                className="my-input-form"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="my-form-group-form">
              <label htmlFor="Price" className="my-label-form">
                PRICE
              </label>
              <textarea
                className="my-textarea-form"
                name="Price"
                value={formData.Price}
                onChange={handleChange}
              />
            </div>

            <div className="my-form-group-form">
              <label htmlFor="Description" className="my-label-form">
                DESCRIPTION
              </label>
              <textarea
                className="my-textarea-form"
                name="Description"
                value={formData.Description}
                onChange={handleChange}
              />
            </div>

            <div className="my-form-group-form">
              <label className="my-label-form" htmlFor="Image">
                IMAGE
              </label>
              <input
                type="file"
                className="my-input-form"
                name="Image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="my-button-form">
              CREATE PRODUCT
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default CreateProduct;
