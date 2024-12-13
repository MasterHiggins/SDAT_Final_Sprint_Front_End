import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCog } from "react-icons/fa";
import styles from "./AdminButton.module.css";

function AdminButton() {
  const navigate = useNavigate();

  const handleClick = (e)=>{
    e.preventDefault();
    console.log("button clicked")
    navigate('/admin')
  }

  return (

      <button 
      onClick={handleClick}
      className={styles.adminButton}
      aria-label="Admin Page"
      >
      <FaUserCog className={styles.icon} />
      <span>Admin</span>
      </button>
  );
}

export default AdminButton;
