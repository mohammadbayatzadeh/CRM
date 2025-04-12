import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import text from "../constants/text";
import FormInput from "./FormInput";

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
    <div className={cn("my-2")}>
      <h3 className="py-2">{text.purchased_items[lang]}</h3>
      {products &&
        products.length > 0 &&
        products.map((product, index) => (
          <Card key={index} className={cn("p-5 mb-2")}>
            {`${text.item[lang]} ${text.number[lang]} ${index + 1}`}
            <FormInput
              name="name"
              type="text"
              label={text.name[lang]}
              form={product}
              exOnChange={(e) => changeHandler(e, index)}
            />
            <div className="flex gap-2">
              <FormInput
                name="price"
                type="text"
                label={text.price[lang]}
                form={product}
                exOnChange={(e) => changeHandler(e, index)}
              />
              <FormInput
                name="qty"
                type="text"
                label={text.qty[lang]}
                form={product}
                exOnChange={(e) => changeHandler(e, index)}
              />
            </div>
            <Button variant="destructive" onClick={() => removeHandler(index)}>
              {text.remove[lang]} {text.item[lang]}
            </Button>
          </Card>
        ))}
      <Button
        onClick={() => addHandler()}
        className={cn("text-center w-full py-8")}
      >
        {text.add[lang]} {text.item[lang]}
      </Button>
    </div>
  );
}

export default FormItem;
