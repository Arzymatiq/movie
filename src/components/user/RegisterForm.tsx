import React from "react";
import { useInput } from "../../hoks/useInput";
import style from "./logForm.module.scss";
import { register } from "../../store/user/userAction";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";

const RegisterForm = () => {
    const loginValidation = {
        isEmpty: true,
        minLength: 4,
    };
    const fullNameValidation = {
        isEmpty: true,
        minLength: 3,
    };
    const passwordValidation = {
        isEmpty: true,
        minLength: 4,
    };

    const login = useInput("", loginValidation);
    const passWord = useInput("", passwordValidation);
    const fullName = useInput("", fullNameValidation);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        login.setDirty(true);
        passWord.setDirty(true);
        fullName.setDirty(true);

        const isValid =
            !login.isEmpty &&
            !login.minLengthError &&
            !passWord.isEmpty &&
            !passWord.minLengthError &&
            !fullName.isEmpty &&
            !fullName.minLengthError;

        if (isValid) {
            try {
                const registerData = {
                    login: login.value,
                    password: passWord.value,
                    fullName: fullName.value,
                    roleId: 1,
                };
                const action = await dispatch(register(registerData));
                if (register.fulfilled.match(action)) {
                    navigate("/login");
                } else {
                    alert(action.payload || "Ошибка регистрации.");
                    login.setValue("");
                    passWord.setValue("");
                    fullName.setValue("");
                }
            } catch (err) {
                console.error("Ошибка регистрации:", err);
            }
        }
    };

    return (
        <div className={style.authInput}>
            <div className={style.authInputCenter}>
                <form onSubmit={handleSubmit}>
                    <h2>Регистрация</h2>
                    <InputField inputHook={login} label="Логин" type="text" />
                    <InputField
                        inputHook={passWord}
                        label="Пароль"
                        type="password"
                    />
                    <InputField
                        inputHook={fullName}
                        label="Полное имя"
                        type="text"
                    />
                    <button type="submit" className={style.submitButton}>
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
