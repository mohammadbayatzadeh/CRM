import Link from "next/link";
import styles from "./Card.module.css";
import axios from "axios";
import { useRouter } from "next/router";

function Card({ firstName, lastName, email, _id }) {
  const router = useRouter();
  const deleteHandler = async () => {
    await axios
      .delete(`/api/costumer/${_id}`)
      .then((res) => {
        router.replace('/')
        // router.reload();
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
