import React, { useEffect, useState } from "react";
import styles from "../css/products.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    const product = axios.get("http://localhost:1010/product");
    const finalList = (await product).data;
    setProducts(finalList);
  };

  const handleDelete = async (id) => {
    const prodDelete = axios.delete(`http://localhost:1010/product/${id}`);
    const result = (await prodDelete).data;
    getProducts();
  };

  const handleSearch = async (e) => {
    const key = e.target.value;
    if (key) {
      const search = axios.get(`http://localhost:1010/search/${key}`);
      const finalSearch = (await search).data;

      if (finalSearch) {
        setProducts(finalSearch);
      }
    } else {
      getProducts();
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h1>Products List</h1>

      <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          handleSearch(e);
        }}
      />
      </div>
      
      <div className={styles.container1}>
        <span>S.No.</span>
        <span>Name</span>
        <span>Price</span>
        <span>Category</span>
        <span>Company</span>
        <span>Update / Delete</span>
      </div>
      {products.length > 0?(
        products.map((p, idx) => {
          return (
            <div key={idx} className={styles.container2}>
              <span>{idx + 1}.</span>
              <span>{p.name}</span>
              <span>${p.price}</span>
              <span>{p.category}</span>
              <span>{p.company}</span>
              <span>
                <button
                  className={styles.update}
                  onClick={() => navigate(`/update/${p._id}`)}
                >
                  Update
                </button>
                <button
                  className={styles.delete}
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </span>
            </div>
          );
        })
      ) : 
          <h1>No result found!!!</h1>
      }
    </div>
  );
};

export default Products;
