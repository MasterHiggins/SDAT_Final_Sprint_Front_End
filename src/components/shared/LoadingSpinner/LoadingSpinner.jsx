import { FaPlane } from 'react-icons/fa';
import styles from './LoadingSpinner.module.css';

function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className={styles.loadingContainer}>
      <FaPlane className={styles.loadingIcon} />
      <p>{message}</p>
    </div>
  );
}

export default LoadingSpinner;