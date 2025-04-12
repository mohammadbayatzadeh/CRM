import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./Card.module.css";

import text from "../constants/text";

import { useSelector } from "react-redux";
import { toast } from "sonner";

function Card({
  firstName_EN,
  firstName_FA,
  lastName_EN,
  lastName_FA,
  email,
  _id,
}) {
  const router = useRouter();
  const lang = useSelector((state) => state.language.lang);
  const deleteHandler = async () => {
    await axios
      .delete(`/api/costumer/${_id}`)
      .then((res) => {
        router.replace("/");
        toast(`${firstName_EN} deleted`);
      })
      .catch((err) => {});
  };

  return (
    <div className={styles.container}>
      <span>{lang === "en" ? firstName_EN : firstName_FA}</span>
      <span>{lang === "en" ? lastName_EN : lastName_FA}</span>
      <span>{email}</span>
      <div className={styles.buttons}>
        <button onClick={deleteHandler}>{text.delete[lang]}</button>
        <div>
          <Link href={`edit/${_id}`}>{text.edit[lang]}</Link>
          <Link href={`costumer/${_id}`}>{text.details[lang]}</Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
