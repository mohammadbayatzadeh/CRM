//comps
import FormInput from "../elements/FormInput";
import FormItem from "../elements/FormItem";

//constants
import text from "../constants/text";

//redux
import { useSelector } from "react-redux";

//styles
import styles from "./Form.module.css";

function Form({ form, setForm }) {
  const lang = useSelector((state) => state.language.lang);
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
        label={`${text.first_name[lang]}*`}
        onchange={(e) => changeHanler(e)}
      />
      <FormInput
        name="lastName"
        value={form.lastName}
        type="text"
        label={`${text.last_name[lang]}*`}
        onchange={(e) => changeHanler(e)}
      />
      <FormInput
        name="email"
        value={form.email}
        type="text"
        label={`${text.email[lang]}*`}
        onchange={(e) => changeHanler(e)}
      />
      <FormInput
        name="phone"
        value={form.phone}
        type="tel"
        label={text.phone[lang]}
        onchange={(e) => changeHanler(e)}
      />
      <FormInput
        name="city"
        value={form.city}
        type="text"
        label={text.city[lang]}
        onchange={(e) => changeHanler(e)}
      />
      <FormItem form={form} setForm={setForm} />
    </div>
  );
}

export default Form;
