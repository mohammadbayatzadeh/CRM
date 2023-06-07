import styles from './Form.module.css'
import FormInput from "../elements/FormInput";

function Form({ form, setForm }) {
  return (
    <div className={styles.container}>
      <FormInput name="name" value="name" type="text" label='name'/>
    </div>
  );
}

export default Form;
