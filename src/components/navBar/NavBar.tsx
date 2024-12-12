import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./navBar.module.scss";
import { updateToken } from "../../helpers/function";
import { logout } from "../../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

const NavBar = () => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useDispatch();

    const token = localStorage.getItem("token");
    const { error, user } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        updateToken();
    }, []);
    return (
        <div className={style.navBar}>
            <div className={style.navBar_center}>
                <div className={style.navBar_items}>
                    <button onClick={() => navigate("/")}>фильмы</button>
                    <button onClick={() => navigate("/series")}>сериалы</button>
                </div>
                <div
                    className={style.login}
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}>
                    <button>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3276/3276535.png"
                            alt=""
                        />
                        аккаунт
                    </button>
                    {showDropdown && (
                        <div className={style.dropdownMenu}>
                            {token ? (
                                <>
                                    <p>{user?.fullName}</p>
                                    <p>{user?.login}</p>
                                    <a onClick={() => dispatch(logout())}>
                                        Выйти
                                    </a>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => navigate("/register")}>
                                        регистрация
                                    </button>
                                    <button onClick={() => navigate("/login")}>
                                        войти
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
