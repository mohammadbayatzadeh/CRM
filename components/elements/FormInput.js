//styles
import { useSelector } from "react-redux";
import styles from "./FormInput.module.css";

function FormInput({
  name,
  type,
  value,
  label,
  rtl = false,
  ltr = false,
  onchange,
}) {
  const lang = useSelector((state) => state.language.lang);
  return (
    <div className={styles.container}>
      <label
        htmlFor={name}
        style={{
          direction: rtl ? "rtl" : ltr ? "ltr" : lang === "en" ? "ltr" : "rtl",
        }}
      >
        {label}
      </label>
      <input
        value={value}
        type={type}
        onChange={onchange}
        name={name}
        id={name}
        style={{
          direction: rtl ? "rtl" : ltr ? "ltr" : lang === "en" ? "ltr" : "rtl",
        }}
      />
    </div>
  );
}

export default FormInput;
