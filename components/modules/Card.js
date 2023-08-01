import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

//styles
import styles from "./Card.module.css";

function Card({ firstName, lastName, email, _id }) {
  const router = useRouter();
  const deleteHandler = async () => {
    await axios
      .delete(`/api/costumer/${_id}`)
      .then((res) => {
        router.replace("/");
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
        <button onClick={deleteHandler}>DELETE</button>
        <Link href={`edit/${_id}`}>Edit</Link>
        <Link href={`costumer/${_id}`}>Details</Link>
      </div>
    </div>
  );
}

export default Card;
