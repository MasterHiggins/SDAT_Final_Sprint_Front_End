import { Link } from "react-router-dom";
import styles from "./NavigationLinks.module.css";

function NavigationLinks({ onLinkClick }) {
  return (
    <div className={styles.links}>
      <Link to="/" onClick={onLinkClick}>
        Flight Board
      </Link>
      <Link to="/search" onClick={onLinkClick}>
        Search
      </Link>
    </div>
  );
}

export default NavigationLinks;
