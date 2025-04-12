import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";

function FormInput({
  name,
  type,
  form,
  setForm,
  exOnChange,
  label,
  rtl = false,
  ltr = false,
}) {
  const lang = useSelector((state) => state.language.lang);
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  return (
    <div
      className="flex justify-start items-start flex-col w-full "
      style={{
        direction: rtl ? "rtl" : ltr ? "ltr" : lang === "en" ? "ltr" : "rtl",
      }}
    >
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <Input
        value={form[name]}
        type={type}
        onChange={exOnChange ? exOnChange : onChange}
        name={name}
        id={name}
        style={{
          direction: rtl ? "rtl" : ltr ? "ltr" : lang === "en" ? "ltr" : "rtl",
        }}
      />
    </div>
  );
}

export default FormInput;
