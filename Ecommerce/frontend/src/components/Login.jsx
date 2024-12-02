import React, { useEffect, useState } from "react";
import styles from "../css/login.module.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogIn = ()=>{
    const [checkEmail,setCheckEmail] = useState("")
    const [checkPassword,setCheckPassword] = useState("")
    const navigate= useNavigate()

    useEffect(()=>{
        const user = localStorage.getItem('user')
    if(user){
            navigate('/')
            }
    })

    const handleLogin = async()=>{
        const result1 = axios.post('http://localhost:1010/login',{
            email: checkEmail,
            password: checkPassword
        })
        const finalResult = (await result1).data
        
        if(finalResult._id){
            localStorage.setItem("user",JSON.stringify(finalResult))
            navigate("/")
        }
        
    }

    return(
        <div className={styles.container}>
            <h2>Log In</h2>
            <input onChange={(e)=>{
                 setCheckEmail(e.target.value)
            }}type="text" placeholder="Enter Your Username or Email " /><br />

            <input onChange={(e)=>{
                setCheckPassword(e.target.value) 
            }} type="password" placeholder="Enter Your Password" /><br />

            <button onClick={handleLogin} >
                Log In
            </button>

        </div>
        
    )
}

export default LogIn