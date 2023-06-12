import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./CostumerDetails.module.css";

function CostumerDetails() {
  const [form, setForm] = useState(null);
  const router = useRouter();
  const { costumerID } = router.query;

  React.useEffect(() => {
    costumerID &&
      axios
        .get(`/api/costumer/${costumerID}`)
        .then((res) => setForm(res.data.data))
        .catch((err) => console.log(err.response.data));
  }, []);

  if (form)
    return (
      <div>
        <h3>Details Page</h3>

        <div className={styles.container}>
          <p>first name: {form.firstName}</p>
          <p>last name: {form.lastName}</p>
          <p>email: {form.email}</p>
          <p>phone: {form.phone}</p>
          <p>updated at: {form.updatedAt}</p>
          <p>city: {form.city}</p>
        </div>
        <div className={styles.productContainer}>
          <div className={styles.row}>
            <span>product</span>
            <span>price</span>
            <span>qty</span>
          </div>
          {form.products.map((product) => (
            <div className={styles.row}>
              <span>{product.name}</span>
              <span>{product.price}</span>
              <span>{product.qty}</span>
            </div>
          ))}
        </div>
      </div>
    );
}

export default CostumerDetails;
