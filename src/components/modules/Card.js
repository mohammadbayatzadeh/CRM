import { Button, buttonVariants } from "@/components/ui/button";
import { Card as CnCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import text from "../constants/text";
import { Loader } from "../elements/Loader";

function Card({
  firstName_EN,
  firstName_FA,
  lastName_EN,
  lastName_FA,
  email,
  birthday,
  _id,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const lang = useSelector((state) => state.language.lang);
  const deleteHandler = async () => {
    setLoading(true);
    await axios
      .delete(`/api/costumer/${_id}`)
      .then((res) => {
        router.replace("/");
        toast(`${firstName_EN} deleted`);
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };

  return (
    <CnCard
      className={cn(
        "w-full  justify-between px-5 flex flex-row items-center mb-2"
      )}
    >
      <div className="gap-5 justify-between  flex flex-row items-center">
        <span>{lang === "en" ? firstName_EN : firstName_FA}</span>
        <span>{lang === "en" ? lastName_EN : lastName_FA}</span>
        <span>{email}</span>
        <span>{new Date(birthday).toLocaleDateString(lang || "en")}</span>
      </div>
      <div className="flex gap-1">
        <Button
          onClick={deleteHandler}
          size="large"
          className={cn("px-2")}
          variant="destructive"
          disabled={loading}
        >
          {loading ? <Loader /> : text.delete[lang]}
        </Button>
        <div className="flex flex-col gap-1">
          <Link
            href={`edit/${_id}`}
            className={buttonVariants({ variant: "outline" })}
          >
            {text.edit[lang]}
          </Link>
          <Link
            href={`costumer/${_id}`}
            className={buttonVariants({ variant: "secondary" })}
          >
            {text.details[lang]}
          </Link>
        </div>
      </div>
    </CnCard>
  );
}

export default Card;
