import { useSelector } from "react-redux";

//styles
import styles from "./FormItem.module.css";

//comps
import FormInput from "./FormInput";

//constants
import text from "../constants/text";

function FormItem({ form, setForm }) {
  const { products } = form;
  const lang = useSelector((state) => state.language.lang);

  const addHandler = () => {
    products.length > 0 &&
      !!products[products.length - 1].name &&
      !!products[products.length - 1].price &&
      !!products[products.length - 1].qty &&
      setForm({
        ...form,
        products: [...products, { name: "", price: "", qty: "" }],
      });
    products.length === 0 &&
      setForm({
        ...form,
        products: [...products, { name: "", price: "", qty: "" }],
      });
  };

  const removeHandler = (index) => {
    const newproducts = [...products];
    newproducts.splice(index, 1);
    setForm({ ...form, products: newproducts });
  };

  const changeHandler = (e, index) => {
    const { name, value } = e.target;
    const newproducts = [...products];
    newproducts[index][name] = value;
    setForm({ ...form, products: newproducts });
  };

  return (
    <div className={styles.container}>
      <h3>{text.purchased_items[lang]}</h3>
      {products &&
        products.length > 0 &&
        products.map((product, index) => (
          <div key={index} className={styles.productContainer}>
            {`${text.item[lang]} ${text.number[lang]} ${index + 1}`}
            <FormInput
              name="name"
              type="text"
              label={text.name[lang]}
              form={product}
              exOnChange={(e) => changeHandler(e, index)}
            />
            <div className={styles.row}>
              <FormInput
                name="price"
                type="text"
                label={text.price[lang]}
                form={product}
                exOnChange={(e) => changeHandler(e, index)}
              />
              <span className={styles.space}></span>
              <FormInput
                name="qty"
                type="text"
                label={text.qty[lang]}
                form={product}
                exOnChange={(e) => changeHandler(e, index)}
              />
            </div>
            <button
              className={styles.remove}
              onClick={() => removeHandler(index)}
            >
              {text.remove[lang]} {text.item[lang]}
            </button>
          </div>
        ))}
      <button className={styles.add} onClick={() => addHandler()}>
        {text.add[lang]} {text.item[lang]}
      </button>
    </div>
  );
}

export default FormItem;
