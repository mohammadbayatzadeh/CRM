import React from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

//styles
import styles from "./CostumerDetails.module.css";

//redux
import { useSelector } from "react-redux";

//constants
import text from "../constants/text";

function CostumerDetails({ data }) {
  const [form, setForm] = React.useState(null);
  const router = useRouter();
  const lang = useSelector((state) => state.language.lang);
  const { costumerID } = router.query;

  React.useEffect(() => {
    setForm(data);
  }, []);

  const deleteHandler = async () => {
    await axios
      .delete(`/api/costumer/${costumerID}`)
      .then((res) => {
        router.push("/");
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  if (form)
    return (
      <div>
        <h3>{text.details_page[lang]} </h3>

        <div className={styles.container}>
          <p>
            {text.first_name[lang]}:{" "}
            {lang === "en" ? form.firstName_EN : form.firstName_FA}
          </p>
          <p>
            {text.last_name[lang]}:{" "}
            {lang === "en" ? form.lastName_EN : form.lastName_FA}
          </p>
          <p>
            {text.email[lang]}: {form.email}
          </p>
          <p>
            {text.phone[lang]}: {form.phone}
          </p>
          <p>
            {text.updated_at[lang]}: {form.updatedAt}
          </p>
          <p>
            {text.city[lang]}: {form.city}
          </p>
        </div>
        <div className={styles.productContainer}>
          <div className={styles.row}>
            <span>{text.product[lang]}</span>
            <span>{text.price[lang]}</span>
            <span>{text.qty[lang]}</span>
          </div>
          {form.products.map((product, index) => (
            <div className={styles.row} key={index}>
              <span>{product.name}</span>
              <span>{product.price}</span>
              <span>{product.qty}</span>
            </div>
          ))}
        </div>
        <div className={styles.row}>
          <button onClick={deleteHandler}>{text.delete[lang]}</button>
          <Link href={`/edit/${costumerID}`}>{text.edit[lang]}</Link>
        </div>
      </div>
    );
}

export default CostumerDetails;
