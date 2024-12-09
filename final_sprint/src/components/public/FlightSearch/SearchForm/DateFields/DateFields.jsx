import styles from "./DateFields.module.css";

const DateFields = ({ departureDate, returnDate, onChange }) => {
  return (
    <div className={styles.formRow}>
      <div className={styles.formGroup}>
        <label htmlFor="departureDate">Departure Date</label>
        <input
          type="date"
          id="departureDate"
          name="departureDate"
          value={departureDate}
          onChange={onChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="returnDate">Return Date (Optional)</label>
        <input
          type="date"
          id="returnDate"
          name="returnDate"
          value={returnDate}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default DateFields;
