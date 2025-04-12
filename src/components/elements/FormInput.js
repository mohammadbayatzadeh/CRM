import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";

function FormInput({ name, type, form, setForm, exOnChange, label }) {
  const lang = useSelector((state) => state.language.lang);
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  return (
    <div className="flex justify-start items-start flex-col w-full">
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <Input
        value={form[name]}
        type={type}
        onChange={exOnChange ? exOnChange : onChange}
        name={name}
        id={name}
      />
    </div>
  );
}

export default FormInput;
