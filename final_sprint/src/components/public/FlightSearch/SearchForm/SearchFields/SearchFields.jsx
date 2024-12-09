import styles from "./SearchFields.module.css";

const SearchFields = ({ origin, destination, onChange }) => {
  return (
    <div className={styles.formRow}>
      <div className={styles.formGroup}>
        <label htmlFor="origin">From</label>
        <input
          type="text"
          id="origin"
          name="origin"
          value={origin}
          onChange={onChange}
          placeholder="City or Airport"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="destination">To</label>
        <input
          type="text"
          id="destination"
          name="destination"
          value={destination}
          onChange={onChange}
          placeholder="City or Airport"
          required
        />
      </div>
    </div>
  );
};

export default SearchFields;
