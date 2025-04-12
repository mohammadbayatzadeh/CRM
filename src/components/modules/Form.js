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

  return (
    <div className={styles.container}>
      <div
        className={styles.doubleInput}
        style={{ direction: "ltr", columnGap: 7 }}
      >
        <FormInput
          name="firstName_EN"
          type="text"
          label="first name*"
          ltr={true}
          form={form}
          setForm={setForm}
        />
        <FormInput
          name="firstName_FA"
          type="text"
          label="نام*"
          rtl={true}
          form={form}
          setForm={setForm}
        />
      </div>
      <div
        className={styles.doubleInput}
        style={{ direction: "ltr", columnGap: 7 }}
      >
        <FormInput
          name="lastName_EN"
          form={form}
          setForm={setForm}
          type="text"
          label="last name*"
          ltr={true}
        />
        <FormInput
          name="lastName_FA"
          form={form}
          setForm={setForm}
          type="text"
          label="نام خانوادگی*"
          rtl={true}
        />
      </div>
      <FormInput
        name="email"
        form={form}
        setForm={setForm}
        type="text"
        label={`${text.email[lang]}*`}
      />
      <FormInput
        name="phone"
        form={form}
        setForm={setForm}
        type="text"
        label={text.phone[lang]}
      />
      <div
        className={styles.doubleInput}
        style={{ direction: "ltr", columnGap: 7 }}
      >
        <FormInput
          name="city_EN"
          form={form}
          setForm={setForm}
          type="text"
          label="city"
          ltr={true}
        />
        <FormInput
          name="city_FA"
          form={form}
          setForm={setForm}
          type="text"
          label="شهر"
          rtl={true}
        />
      </div>
      <FormItem form={form} setForm={setForm} />
    </div>
  );
}

export default Form;
