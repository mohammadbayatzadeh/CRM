import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

//styles
import styles from "./Card.module.css";

//elements
import { Toast } from "../elements/Toast";

//constants
import text from "../constants/text";

//redux
import { useSelector } from "react-redux";

function Card({ firstName, lastName, email, _id }) {
  const router = useRouter();
  const lang = useSelector((state) => state.language.lang);
  const deleteHandler = async () => {
    await axios
      .delete(`/api/costumer/${_id}`)
      .then((res) => {
        router.replace("/");
        Toast(`${firstName} deleted`, "success");
      })
      .catch((err) => {});
  };

  return (
    <div className={styles.container}>
      <span>
        {firstName} {lastName}
      </span>
      <span>{email}</span>
      <div className={styles.buttons}>
        <button onClick={deleteHandler}>{text.delete[lang]}</button>
        <Link href={`edit/${_id}`}>{text.edit[lang]}</Link>
        <Link href={`costumer/${_id}`}>{text.details[lang]}</Link>
      </div>
    </div>
  );
}

export default Card;
