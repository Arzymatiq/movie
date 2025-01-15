import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./navBar.module.scss";
import { updateToken } from "../../helpers/function";
import { logout } from "../../store/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showDropdown, setShowDropdown] = useState(false);

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

    return (
        <div className={style.navBar}>
            <div className={style.navBar_center}>
                <div className={style.navBar_items}>
                    <button onClick={() => handleNavigate("/")}>Фильмы</button>
                    <button onClick={() => handleNavigate("/series")}>
                        Сериалы
                    </button>
                    <button onClick={() => handleNavigate("/katya")}>
                        Посхалка
                    </button>
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
                        Аккаунт
                    </button>
                    {showDropdown && (
                        <div className={style.dropdownMenu}>
                            {token ? (
                                <>
                                    <h3>{user?.fullName || "Гость"}</h3>
                                    <h3>{user?.login || "Нет логина"}</h3>
                                    <button onClick={() => logOut()}>
                                        Выйти
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            handleNavigate("/register");
                                        }}>
                                        Регистрация
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleNavigate("/login")
                                        }>
                                        Войти
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
