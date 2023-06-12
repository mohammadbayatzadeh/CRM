import styles from "./Form.module.css";
import FormInput from "../elements/FormInput";
import FormItem from "../elements/FormItem";

function Form({ form, setForm }) {
  const changeHanler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className={styles.container}>
      <FormInput
        name="firstName"
        value={form.firstName}
        type="text"
        label="first name*"
        onchange={(e) => changeHanler(e)}
      />
      <FormInput
        name="lastName"
        value={form.lastName}
        type="text"
        label="last name*"
        onchange={(e) => changeHanler(e)}
      />
      <FormInput
        name="email"
        value={form.email}
        type="text"
        label="email*"
        onchange={(e) => changeHanler(e)}
      />
      <FormInput
        name="phone"
        value={form.phone}
        type="tel"
        label="phone"
        onchange={(e) => changeHanler(e)}
      />
      <FormInput
        name="city"
        value={form.city}
        type="text"
        label="city"
        onchange={(e) => changeHanler(e)}
      />
      <FormItem form={form} setForm={setForm} />
    </div>
  );
}

export default Form;
