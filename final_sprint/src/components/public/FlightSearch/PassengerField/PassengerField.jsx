import styles from "./PassengerField.module.css";

const PassengerField = ({ passengers, onChange }) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor="passengers">Passengers</label>
      <input
        type="number"
        id="passengers"
        name="passengers"
        value={passengers}
        onChange={onChange}
        min="1"
        max="9"
        required
      />
    </div>
  );
};

export default PassengerField;
