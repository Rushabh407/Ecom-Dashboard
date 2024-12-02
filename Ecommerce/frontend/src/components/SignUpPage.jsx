import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/signuppage.module.css";
import axios from "axios";

const SignUpPage = ()=>{
    
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errorMessage,setErrorMessage] = useState("")
    const navigate = useNavigate()
    useEffect(()=>{
        const user = localStorage.getItem('user')
    if(user){
            navigate('/')
            }
    })

    const verifyData = ()=>{
        if(name.length>2 && email.includes("@")){
            checkEmail()
        }
    }
    const checkEmail = async()=>{
        const checkEmail = axios.post('http://localhost:1010/checkEmail',{
            email:email
        })
        const result = (await checkEmail).data
        if(result._id){
            setErrorMessage("Email already exist")
        }else{
            storeData()
            navigate('/login')
        }
        
    }
    const storeData = async()=>{
        const userCollection = axios.post('http://localhost:1010/register',{
            name:name,
            email: email,
            password: password
        })
        
        const result = (await userCollection).data; 
    }
    return(
        <div className={styles.container}>
            <h2>Register</h2>
            <div className={styles.error}>{errorMessage}</div>
            <input type="text" onChange={(e)=>setName(e.target.value)} placeholder="Enter Your Name" required/><br />

            <input type="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email" required/><br />

            <input type="password" onChange={(e)=>setPassword(e.target.value)}placeholder="Set Password" required/><br />

            <button onClick={verifyData}>
                Sign Up
            </button>

        </div>
    )
}

export default SignUpPage