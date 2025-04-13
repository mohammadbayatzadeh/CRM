import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import text from "../constants/text";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";

function FormDate({ form, setForm }) {
  const lang = useSelector((state) => state.language.lang);
  const changeHandler = (e) => {
    setForm({ ...form, birthday: new Date(e).toISOString() });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full flex items-center justify-between",
            !form.birthday && "text-muted-foreground",
            lang == "fa" && "!flex-row-reverse"
          )}
        >
          <div className="flex items-center gap-1" dir="ltr">
            <CalendarIcon className="-translate-y-0.5" />
            {form.birthday ? (
              format(form.birthday, "PPP")
            ) : (
              <span>{text.pickDate["en"]}*</span>
            )}
          </div>
          <div className="flex items-center gap-1" dir="rtl">
            <CalendarIcon className="-translate-y-0.5" />
            {form.birthday ? (
              format(form.birthday, "PPP")
            ) : (
              <span>{text.pickDate["fa"]}*</span>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={form.birthday}
          onSelect={changeHandler}
        />
      </PopoverContent>
    </Popover>
  );
}

export default FormDate;
