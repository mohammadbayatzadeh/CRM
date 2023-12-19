//styles
import { useSelector } from "react-redux";
import styles from "./FormInput.module.css";

function FormInput({
  name,
  type,
  form,
  setForm,
  label,
  rtl = false,
  ltr = false,
}) {
  const lang = useSelector((state) => state.language.lang);
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
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
        value={form[name]}
        type={type}
        onChange={onChange}
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
