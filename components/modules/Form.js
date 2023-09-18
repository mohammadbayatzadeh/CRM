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
      <div className={styles.doubleInput} style={{ direction: "ltr" }}>
        <FormInput
          name="firstName_EN"
          value={form.firstName_EN}
          type="text"
          label="first name*"
          ltr={true}
          onchange={(e) => changeHanler(e)}
        />
        <FormInput
          name="firstName_FA"
          value={form.firstName_FA}
          type="text"
          label="نام*"
          rtl={true}
          onchange={(e) => changeHanler(e)}
        />
      </div>
      <div className={styles.doubleInput} style={{ direction: "ltr" }}>
        <FormInput
          name="lastName_EN"
          value={form.lastName_EN}
          type="text"
          label="last name*"
          ltr={true}
          onchange={(e) => changeHanler(e)}
        />
        <FormInput
          name="lastName_FA"
          value={form.lastName_FA}
          type="text"
          label="نام خانوادگی*"
          rtl={true}
          onchange={(e) => changeHanler(e)}
        />
      </div>
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
        type="text"
        label={text.phone[lang]}
        onchange={(e) => changeHanler(e)}
      />
      <div className={styles.doubleInput} style={{ direction: "ltr" }}>
        <FormInput
          name="city_EN"
          value={form.city_EN}
          type="text"
          label="city"
          ltr={true}
          onchange={(e) => changeHanler(e)}
        />
        <FormInput
          name="city_FA"
          value={form.city_FA}
          type="text"
          label="شهر"
          rtl={true}
          onchange={(e) => changeHanler(e)}
        />
      </div>
      <FormItem form={form} setForm={setForm} />
    </div>
  );
}

export default Form;
