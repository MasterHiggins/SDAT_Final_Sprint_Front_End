import { useState } from "react";
import Logo from "./Logo/Logo";
import NavigationLinks from "./NavigationLinks/NavigationLinks";
import AdminButton from "./AdminButton/AdminButton";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from "./Navbar.module.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.content}>
          <Logo />
          <div className={styles.desktopNav}>
            <NavigationLinks />
          </div>
          <div className={styles.actions}>
            <AdminButton />
            <button
              className={styles.menuButton}
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className={styles.mobileNav}>
            <NavigationLinks onLinkClick={() => setIsOpen(false)} />
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
