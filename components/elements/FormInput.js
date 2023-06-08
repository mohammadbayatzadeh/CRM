import styles from "./FormInput.module.css";

function FormInput({ name, type, value, label, onchange }) {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        type={type}
        onChange={onchange}
        name={name}
        id={name}
      />
    </div>
  );
}

export default FormInput;
