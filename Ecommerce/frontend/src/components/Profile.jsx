import React, { useEffect, useState } from "react";
import styles from "../css/profile.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate()
  const user1 = localStorage.getItem("user");
  const user = JSON.parse(user1);
  const [editable1, setEditable1] = useState(false);
  const [editable2, setEditable2] = useState(false);
  const [editable3, setEditable3] = useState(false);
  const [editable4, setEditable4] = useState(false);
  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);
  const [userAddress, setUserAddress] = useState(user.address);
  const [userMobile, setUserMobile] = useState(user.mobile);
  const handleEdit = (editable, setEditable) => {
    editable ? setEditable(false) : setEditable(true);
  };

  const handleChange = async (id, setEditable) => {
    const change = axios.put(`http://localhost:1010/user/${id}`, {
      name: userName,
      email: userEmail,
      address:userAddress,
      mobile : userMobile
    });
    const finalChange = (await change).data;
    const uId = user._id
    const _v = user.__v
    localStorage.clear()
    localStorage.setItem('user',JSON.stringify({
      _id:uId,
      __v: _v,
      name: userName,
      email: userEmail,
      address:userAddress,
      mobile : userMobile
    }))
    setEditable(false);
  };
  
  return (
    <div className={styles.maincontainer}>
      <div className={styles.container2}>
        <div className={styles.info}>
          <p>UserId :</p>
          <p className={styles.input}>{user._id}</p>
          <button className={styles.password} onClick={()=>navigate('/password')}>Change Password</button>
        </div>
        
        <div className={styles.info}>
          <p>Name :</p>
          {editable1 ? (
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className={styles.input}
            />
          ) : (
            <p className={styles.input}>{userName}</p>
          )}
          {editable1 ? (
            <div>
              <button onClick={() => handleChange(user._id, setEditable1)}>
                Save
              </button>
              <button onClick={() => setEditable1(false)}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => handleEdit(editable1, setEditable1)}>
              Edit
            </button>
          )}
        </div>
        <div className={styles.info}>
          <p>Email :</p>
          {editable2 ? (
            <input
              type="text"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className={styles.input}
            />
          ) : (
            <p className={styles.input}>{userEmail}</p>
          )}
          {editable2 ? (
            <div>
              <button onClick={() => handleChange(user._id, setEditable2)}>
                Save
              </button>
              <button onClick={() => setEditable2(false)}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => handleEdit(editable2, setEditable2)}>
              Edit
            </button>
          )}
        </div>
        <div className={styles.info}>
          <p>Address :</p>
          {editable3 ? (
            <input
              type="text"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              className={styles.input}
            />
          ) : (
            <p className={styles.input}>{userAddress}</p>
          )}
          {editable3 ? (
            <div>
              <button onClick={() => handleChange(user._id, setEditable3)}>
                Save
              </button>
              <button onClick={() => setEditable3(false)}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => handleEdit(editable3, setEditable3)}>
              Edit
            </button>
          )}
        </div>
        <div className={styles.info}>
          <p>Mobile no. :</p>
          {editable4 ? (
            <input
              type="number"
              value={userMobile}
              onChange={(e) => setUserMobile(e.target.value)}
              className={styles.input}
            />
          ) : (
            <p className={styles.input}>{userMobile}</p>
          )}
          {editable4 ? (
            <div>
              <button onClick={() => handleChange(user._id, setEditable4)}>
                Save
              </button>
              <button onClick={() => setEditable4(false)}>Cancel</button>
            </div>
          ) : (
            <button onClick={() => handleEdit(editable4, setEditable4)}>
              Edit
            </button>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Profile;
