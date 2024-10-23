import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "@/assets/locales/en.json";
import translationRU from "@/assets/locales/ru.json";

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    ru: {
      translation: translationRU,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, 
  },
});

export default i18next;
