import { useState } from "react";
import styles from "./FormItem.module.css";
import FormInput from "./FormInput";

function FormItem({ form, setForm }) {
  const { products } = form;

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
      <h3>purchased items</h3>
      {products.map((product, index) => (
        <div key={index} className={styles.productContainer}>
          <FormInput
            name="name"
            type="text"
            label="name"
            value={product.name}
            onchange={(e) => changeHandler(e, index)}
          />
          <div className={styles.row}>
            <FormInput
              name="price"
              type="text"
              label="Price"
              value={product.price}
              onchange={(e) => changeHandler(e, index)}
            />
            <span className={styles.space}></span>
            <FormInput
              name="qty"
              type="text"
              label="qty"
              value={product.qty}
              onchange={(e) => changeHandler(e, index)}
            />
          </div>
          <button
            className={styles.remove}
            onClick={() => removeHandler(index)}
          >
            remove item
          </button>
        </div>
      ))}
      <button className={styles.add} onClick={() => addHandler()}>
        Add item
      </button>
    </div>
  );
}

export default FormItem;
