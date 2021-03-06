import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../store/products";
import { useHistory } from "react-router-dom";
import { Card, Button, FormControl, TextField } from "@material-ui/core";

export default function AddProduct() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [productValues, setProductValues] = useState({
    pokemon_name: "",
    type: "",
    imageUrl:
      "https://i.kym-cdn.com/photos/images/facebook/000/879/453/52c.png",
    price: 0,
    description: "Add Description Here",
    quantity: 0,
  });

  const handleChange = (event) => {
    event.persist();
    setProductValues((productValues) => ({
      ...productValues,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Add New Product</h2>

        <form
          id="addProductForm"
          onSubmit={(event) => {
            event.preventDefault();
            dispatch(createProduct(productValues, history));
          }}
        >
          <label className="label">
            Name:
            <input
              name="pokemon_name"
              type="text"
              placeholder="Name"
              value={productValues.pokemon_name}
              onChange={handleChange}
            />
          </label>
          <label className="label">
            Type:
            <input
              name="type"
              type="text"
              placeholder="Type"
              value={productValues.type}
              onChange={handleChange}
            />
          </label>
          <label className="label">
            Image Url:
            <input
              name="imageUrl"
              type="text"
              placeholder="Image Url"
              value={productValues.imageUrl}
              onChange={handleChange}
            />
          </label>
          <label className="label">
            Price:
            <input
              name="price"
              type="number"
              placeholder="Price"
              value={productValues.price}
              onChange={handleChange}
            />
          </label>
          <label className="label">
            Description:
            <input
              name="description"
              type="text"
              placeholder="Description"
              value={productValues.description}
              onChange={handleChange}
            />
          </label>
          <label className="label">
            Quantity:
            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={productValues.quantity}
              onChange={handleChange}
            />
          </label>
          <button className="btn" type="submit">
            Submit New Product
          </button>
        </form>
      </Card>
    </div>
  );
}
