import { Link } from "react-router-dom";
import { FaUserCog } from "react-icons/fa";
import styles from "./AdminButton.module.css";

function AdminButton() {
  return (
    <Link
      to="/admin"
      className={styles.adminButton}
      aria-label="Admin Dashboard"
    >
      <FaUserCog className={styles.icon} />
      <span>Admin</span>
    </Link>
  );
}

export default AdminButton;
