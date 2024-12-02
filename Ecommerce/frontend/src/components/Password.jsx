import React, { useState } from "react";
import styles from "../css/password.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Password = () => {
  const [current, setCurrent] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const user1 = localStorage.getItem("user");
  const user = JSON.parse(user1);
  const navigate = useNavigate()

  const changePassword = async () => {
    if (newPassword == confirmPassword) {
      const update = axios.put(`http://localhost:1010/password/${user._id}`, {
        password: newPassword,
      });
      const finalUpdate = await update;
      navigate('/profile')
    } else {
      setErrorMessage("New password and confirm password doesnt match");
    }
  };

  const handleUpdate = async () => {
    const password = axios.post(`http://localhost:1010/password`, {
      password: current,
      _id: user._id,
    });
    const result = (await password).data;

    if (result._id == user._id) {
      changePassword();
    } else {
      setErrorMessage("Incorrect current password");
    }
  };
  return (
    <div className={styles.container}>
      <input
        type="password"
        placeholder="Enter current password"
        value={current}
        required
        onChange={(e) => setCurrent(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        required
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        required
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Password</button>
      <div className={styles.error}>{errorMessage}</div>
    </div>
  );
};

export default Password;
