import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Function to get the language from the URL (without hooks)
const getCurrentLang = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("language") || "en-US";
};

const currentLang = getCurrentLang();

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        movie: "movie",
        series: "Series",
        account: "account",
        logout: "logout",
        register: "register",
        login: "login",
        regbutton: "registration",
        required: "This field is required",
        message: "maximum length 20 characters",
        message1: "Minimum length 4 characters",
        requiredcheckbox: "You must agree with the conditions",
        theme: "theme",
        dark: "dark",
        light: "light",
        green: "green"
      }
    },
    ru: {
      translation: {
        movie: "Фильм",
        series: "Сериал",
        account: "Аккаунт",
        logout: "выйти",
        register: "регистрация",
        login: "авторизация",
        regbutton: "Зарегистрироваться",
        required: "это поле обязательно к заполнению",
        message: "максимальная длина 20 символов",
        message1: "минимальная длина 4 символа",
        requiredcheckbox: "вы должны согласиться с условиями",
        theme: "тема",
        dark: "темный",
        light: "светлый",
        green: "зеленый"
      }
    },
    kr: {
      translation: {
        movie: "Кино",
        series: "Сериалы",
        account: "Аккаунт",
        logout: "чыгуу",
        register: "регистр",
        login: "авторизация",
        regbutton: "Катталуу",
        required: "бул талаа милдеттүү",
        message: "максималдуу узундук 20 белги",
        message1: "минималдуу узундук 4 белги",
        requiredcheckbox: "сиз жоболор жана шарттарга макул болушуңуз керек",
        theme: "тема",
        dark: "караңгы",
        light: "жарык",
        green: "жашыл"
      }
    }
  },
  lng: currentLang,
  fallbackLng: currentLang,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
