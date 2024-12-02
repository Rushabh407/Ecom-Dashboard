import React, { useState } from "react";
import styles from "../css/addProduct.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [ name,setName] = useState("")
    const [price,setPrice] = useState("")
    const [category,setCategory] = useState("")
    const [company,setCompany] = useState("")
    const [error,setError] = useState(false)
    const navigate = useNavigate()

    const handleAdd = async()=>{
        if(!name || !price || !category || !company){
          setError(true)
          return false
        }else{
          setError(false)
        }
        const userId = JSON.parse(localStorage.getItem("user"))._id
        const result = axios.post('http://localhost:1010/addProduct',{
            name,
            price,
            category,
            company,
            userId
        })
        const finalResult = (await result).data
        setName("")
        setPrice("")
        setCompany("")
        setCategory("")
        
    }
  return (
    
    <div className={styles.container}>
      <h1>Add Product</h1>
      <input type="text" placeholder="Enter Product Name" value={name} onChange={(e)=>setName(e.target.value)} />
      {error && !name?<span className={styles.error}>Invalid name!!!</span>:null}
      <br />
      <input type="text" placeholder="Enter Product Price" value={price} onChange={(e)=>setPrice(e.target.value)} />
      {error && !price?<span className={styles.error}>Invalid price!!!</span>:null}
      <br />
      <input type="text" placeholder="Enter Product Category" value={category} onChange={(e)=>setCategory(e.target.value)} />
      {error && !category?<span className={styles.error}>Invalid category!!!</span>:null}
      <br />
      <input type="text" placeholder="Enter Product Company" value={company} onChange={(e)=>setCompany(e.target.value)} />
      {error && !company?<span className={styles.error}>Invalid description!!!</span>:null}
      <br />
      <div>
      <button onClick={handleAdd}>Add</button>
      <button onClick={()=>navigate('/products')}>Cancel</button>
      </div>
    </div>
  );
};

export default AddProduct;
