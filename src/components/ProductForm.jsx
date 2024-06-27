import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = ({ match, history }) => {
  const [product, setProduct] = useState({
    name: "",
    sku: 0,
    description: "",
    type: "Vegetable",
    marketingDate: "",
  });

  useEffect(() => {
    if (match.params.id) {
      axios
        .get(`http://localhost:5000/products/${match.params.id}`)
        .then((response) => setProduct(response.data))
        .catch((error) => console.error(error));
    }
  }, [match.params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = match.params.id ? "put" : "post";
    const url = match.params.id
      ? `http://localhost:5000/products/${match.params.id}`
      : "http://localhost:5000/products";

    axios[method](url, product)
      .then(() => history.push("/"))
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Product Name"
        maxLength="50"
        required
      />
      <input
        type="number"
        name="sku"
        value={product.sku}
        onChange={handleChange}
        placeholder="SKU"
        min="0"
        required
      />
      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <select name="type" value={product.type} onChange={handleChange} required>
        <option value="Vegetable">Vegetable</option>
        <option value="Fruit">Fruit</option>
        <option value="Field Crop">Field Crop</option>
      </select>
      <input
        type="date"
        name="marketingDate"
        value={product.marketingDate}
        onChange={handleChange}
        required
      />
      <button type="submit">Save</button>
      <button type="button" onClick={() => history.push("/")}>
        Cancel
      </button>
    </form>
  );
};

export default ProductForm;
