import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../css/navbar.module.css";

const Navbar = () => {
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <div>
      {user ? (
        <div className={styles.maincontainer}>
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/10889134169231.56c63b728303a.png"
            alt="logo"
            className={styles.logo}
            onClick={() => navigate("/")}
          />
          <div className={styles.container}>
            <p>
              <Link to="/products">Products</Link>
            </p>
            <p>
              <Link to="/add">Add Product</Link>
            </p>
            <p>
              <Link to="/profile">Profile({JSON.parse(user).name})</Link>
            </p>
          </div>
          <div>
            <p>
              <Link onClick={logout} to="/signup">
                Log Out
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.maincontainer2}>
          <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/10889134169231.56c63b728303a.png"
            alt="logo"
            className={styles.logo}
          />
          <div className={styles.container2}>
            <p>
              <Link to="login">Log In</Link>
            </p>
            <p>
              <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
