import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import style from "./navBar.module.scss";
import { updateToken } from "../../helpers/function";
import { logout } from "../../store/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const token = useMemo(() => localStorage.getItem("token"), []);
    const { user } = useAppSelector((state) => state.users);

    useEffect(() => {
        updateToken();
    }, []);

    const handleNavigate = (path: string) => navigate(path);
    const logOut = () => {
        dispatch(logout());
        window.location.reload();
    };
    const { t } = useTranslation<"translation">();
    const [currentLang, setCurrentLang] = useState(
        localStorage.getItem("language") || "en-US"
    );

    useEffect(() => {
        i18n.changeLanguage(currentLang);
        searchParams.set("language", currentLang);
        setSearchParams(searchParams);
    }, [currentLang, searchParams, setSearchParams]);

    const handleChangeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        setCurrentLang(lang);

        switch (lang) {
            case "ru":
                localStorage.setItem("language", "ru-RU");
                break;
            case "en":
                localStorage.setItem("language", "en-US");
                break;
        }
    };
    return (
        <div className={style.navBar}>
            <div className={style.navBar_center}>
                <div className={style.navBar_items}>
                    <button onClick={() => handleNavigate("/")}>
                        {t("movie")}
                    </button>
                    <button onClick={() => handleNavigate("/series")}>
                        {t("series")}
                    </button>
                    <div className={style.languageSelector}>
                        <button
                            className={
                                currentLang === "ru" ? style.activeLang : ""
                            }
                            onClick={() => handleChangeLanguage("ru")}>
                            RU
                        </button>
                        <button
                            className={
                                currentLang === "en" ? style.activeLang : ""
                            }
                            onClick={() => handleChangeLanguage("en")}>
                            EN
                        </button>
                    </div>
                </div>
                <div
                    className={style.login}
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}>
                    <button>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3276/3276535.png"
                            alt="Аккаунт"
                        />
                        {t("account")}
                    </button>
                    {showDropdown && (
                        <div className={style.dropdownMenu}>
                            {token ? (
                                <>
                                    <h3>{user?.fullName || "Гость"}</h3>
                                    <h3>{user?.login || "Нет логина"}</h3>
                                    <button onClick={() => logOut()}>
                                        {t("logout")}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() =>
                                            handleNavigate("/register")
                                        }>
                                        {t("register")}
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigate("/login")
                                        }>
                                        {t("login")}
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;
