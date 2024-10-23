import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Language = () => {
  const [lnValue, setLnValue] = useState<string>(() => {
    const lng = JSON.parse(localStorage.getItem("language")!);
    if (lng) {
      return lng;
    } else {
      return "en";
    }
  });

  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLnValue(lng);
    localStorage.setItem("language", JSON.stringify(lng));
  };
  return (
    <Select value={lnValue} onValueChange={changeLanguage}>
      <SelectTrigger className="w-auto">
        <SelectValue placeholder="Ln" />
      </SelectTrigger>
      <SelectContent className="w-[48px]">
        <SelectItem value="en">{t("en")}</SelectItem>
        <SelectItem value="ru">{t("ru")}</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default Language;
