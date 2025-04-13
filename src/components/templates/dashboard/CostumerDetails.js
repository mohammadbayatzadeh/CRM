import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import text from "../../constants/text";
import { Loader } from "../../elements/Loader";

function CostumerDetails({ data }) {
  const [form, setForm] = React.useState(null);
  const router = useRouter();
  const lang = useSelector((state) => state.language.lang);
  const { costumerID } = router.query;
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setForm(data);
  }, []);

  const deleteHandler = async () => {
    setLoading(true);
    await axios
      .delete(`/api/costumer/${costumerID}`)
      .then((res) => {
        router.push("/");
      })
      .catch()
      .finally(() => setLoading(false));
  };

  if (form)
    return (
      <div>
        <h1 className="text-xl">{text.details_page[lang]}</h1>
        <Card
          className={cn(
            "w-full flex flex-row justify-between items-center  p-5  my-5"
          )}
        >
          <div className="flex flex-col gap-5 w-full">
            <p>
              {text.first_name[lang]}: {form[`firstName_${lang.toUpperCase()}`]}
            </p>
            <p>
              {text.last_name[lang]}: {form[`lastName_${lang.toUpperCase()}`]}
            </p>
            <p>
              {text.email[lang]}: {form.email}
            </p>
            <p>
              {text.pickDate[lang]}:{" "}
              {new Date(form.birthday).toLocaleDateString(lang || "en")}
            </p>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <p>
              {text.phone[lang]}: {form.phone}
            </p>
            <p>
              {text.updated_at[lang]}:{" "}
              {new Date(form.updatedAt).toLocaleDateString(lang || "en")}
            </p>
            <p>
              {text.city[lang]}: {form[`city_${lang.toUpperCase()}`]}
            </p>
          </div>
        </Card>
        <Card
          className={cn(
            "w-full flex flex-col justify-between items-center p-5 my-5"
          )}
        >
          <div className="grid grid-cols-3 items-center w-full text-center">
            <span>{text.product[lang]}</span>
            <span>{text.price[lang]}</span>
            <span>{text.qty[lang]}</span>
          </div>
          {form.products.map((product, index) => (
            <div
              className="grid grid-cols-3 items-center w-full text-center"
              key={index}
            >
              <span>{product.name}</span>
              <span>{product.price}</span>
              <span>{product.qty}</span>
            </div>
          ))}
        </Card>
        <div className="flex w-full justify-between items-center">
          <Button
            onClick={deleteHandler}
            variant="destructive"
            disabled={loading}
          >
            {loading ? <Loader /> : text.delete[lang]}
          </Button>
          <Link
            href={`/edit/${costumerID}`}
            className={buttonVariants({ variant: "outline" })}
          >
            {text.edit[lang]}
          </Link>
        </div>
      </div>
    );
}

export default CostumerDetails;
