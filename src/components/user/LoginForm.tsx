import React from "react";
import { useInput } from "../../hoks/useInput";
import style from "./logForm.module.scss";
import { loginFunc } from "../../store/user/userAction";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useBooleanInput } from "../../hoks/useBooleanInput";
import InputField from "./InputField";

const LoginForm = () => {
    const loginValidation = {
        isEmpty: true,
        minLength: 4,
        isLogin: true,
    };
    const passwordValidation = {
        isEmpty: true,
        minLength: 4,
    };

    const login = useInput("", loginValidation);
    const passWord = useInput("", passwordValidation);
    const agreeToDataManagement = useBooleanInput(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        login.setDirty(true);
        passWord.setDirty(true);

        const isValid =
            !login.isEmpty &&
            !login.minLengthError &&
            !passWord.isEmpty &&
            !passWord.minLengthError &&
            agreeToDataManagement.value;

        if (!agreeToDataManagement.value) {
            alert("Необходимо согласиться с обработкой данных.");
            return;
        }

        if (isValid) {
            try {
                const loginData = {
                    login: login.value,
                    password: passWord.value,
                };
                const action = await dispatch(loginFunc(loginData));
                if (loginFunc.fulfilled.match(action)) {
                    navigate("/");
                } else {
                    alert(action.payload || "Ошибка входа.");
                    login.setValue("");
                    passWord.setValue("");
                }
            } catch (err) {
                console.error("Ошибка логина:", err);
            }
        }
    };

    return (
        <div className={style.authInput}>
            <div className={style.authInputCenter}>
                <form onSubmit={handleSubmit}>
                    <h2>Вход</h2>
                    <InputField inputHook={login} label="Логин" type="text" />
                    <InputField
                        inputHook={passWord}
                        label="Пароль"
                        type="password"
                    />
                    <div className={style.checkboxWrapper}>
                        <label>
                            <input
                                type="checkbox"
                                checked={agreeToDataManagement.value}
                                onChange={(e) =>
                                    agreeToDataManagement.setValue(
                                        e.target.checked
                                    )
                                }
                            />
                            Я согласен на обработку данных
                        </label>
                    </div>
                    <button type="submit" className={style.submitButton}>
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
