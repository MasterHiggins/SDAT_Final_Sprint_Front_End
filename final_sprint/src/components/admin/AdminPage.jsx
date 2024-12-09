import React from "react";
import styles from "./AdminPage.module.css"
import { Link } from "react-router-dom";

const AdminPage = ()=>{
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Admin Board</h1>
            <div className={styles.adminNav}>
                <Link to={"/admin/passengers"}className={styles.navButton}>passengers</Link>
                <Link to={"/admin/aircraft"}className={styles.navButton}>aircraft</Link>
                <Link to={"/admin/airports"}className={styles.navButton}>airports</Link>
                <Link to={"/admin/flights"}className={styles.navButton}>flights</Link>
            </div>
        </div>
    )
}
export default AdminPage;