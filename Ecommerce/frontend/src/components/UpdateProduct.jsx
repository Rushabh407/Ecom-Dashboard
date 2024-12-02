import React, { useEffect, useState } from "react";
import styles from "../css/update.module.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [updateName, setUpdateName] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");
  const [updateCategory, setUpdateCategory] = useState("");
  const [updateCompany, setUpdateCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    const info = axios.get(`http://localhost:1010/product/${params.id}`);
    const finalInfo = (await info).data;
    setUpdateName(finalInfo.name);
    setUpdatePrice(finalInfo.price);
    setUpdateCategory(finalInfo.category);
    setUpdateCompany(finalInfo.company);
  };

  const updateData = async () => {
    const data = axios.put(`http://localhost:1010/product/${params.id}`, {
      name: updateName,
      price: updatePrice,
      category: updateCategory,
      company: updateCompany,
    });
    const finalData = (await data).data;
    console.log(finalData);

    navigate("/products");
  };

  return (
    <div className={styles.container}>
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="Update Product Name"
        value={updateName}
        onChange={(e) => setUpdateName(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Update Product Price"
        value={updatePrice}
        onChange={(e) => setUpdatePrice(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Update Product Category"
        value={updateCategory}
        onChange={(e) => setUpdateCategory(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Update Product Company"
        value={updateCompany}
        onChange={(e) => setUpdateCompany(e.target.value)}
      />
      <br />
      <div>
        <button onClick={updateData}>Update</button>
        <button onClick={() => navigate("/products")}>Cancel</button>
      </div>
    </div>
  );
};

export default UpdateProduct;
