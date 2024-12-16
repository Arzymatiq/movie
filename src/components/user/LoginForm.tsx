import React, { useState } from "react";
import { useInput } from "../../hoks/useInput";
import style from "./logForm.module.scss";
import { loginFunc } from "../../store/user/userAction";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useBooleanInput } from "../../hoks/useBooleanInput";
import { InputField } from "./InputField";
import { CheckboxWithValidation } from "./CheckboxWithValidation";

const LoginForm = () => {
    const loginValidation = {
        isEmpty: true,
        minLength: 4,
        isLogin: true,
    };
    const passwordValidation = {
        isEmpty: true,
        minLength: 6,
    };

    const login = useInput("", loginValidation);
    const passWord = useInput("", passwordValidation);
    const agreeToDataManagement = useBooleanInput(false);

    const [agreeError, setAgreeError] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const validateForm = () => {
        login.setDirty(true);
        passWord.setDirty(true);
        setAgreeError(!agreeToDataManagement.value);

        return (
            !login.isEmpty &&
            !login.minLengthError &&
            !passWord.isEmpty &&
            !passWord.minLengthError &&
            agreeToDataManagement.value
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const loginData = {
                    login: login.value,
                    password: passWord.value,
                    isAgreeToManagmentData: agreeToDataManagement.value,
                };

                const action = await dispatch(loginFunc(loginData));
                if (loginFunc.fulfilled.match(action)) {
                    navigate("/");
                    window.location.reload();
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
                    <CheckboxWithValidation
                        inputHook={agreeToDataManagement}
                        label="Согласие на обработку данных"
                        error={agreeError ? "Необходимо согласие" : ""}
                    />
                    <button type="submit" className={style.submitButton}>
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
