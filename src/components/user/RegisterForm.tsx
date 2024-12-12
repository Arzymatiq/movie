import React from "react";
import { useInput } from "../../hoks/useInput";
import style from "./logForm.module.scss";
import { register } from "../../store/user/userAction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";

const InputField = ({ inputHook, label, type }: any) => {
    return (
        <div>
            {inputHook.dirty && inputHook.isEmpty ? (
                <div style={{ color: "red" }}>Поле не может быть пустым</div>
            ) : inputHook.dirty && inputHook.minLengthError ? (
                <div style={{ color: "red" }}>
                    Поле должно быть минимум 4 символа
                </div>
            ) : (
                inputHook.dirty &&
                inputHook.loginError && (
                    <div style={{ color: "red" }}>Введите корректный login</div>
                )
            )}

            <input
                onChange={inputHook.onChange}
                onBlur={inputHook.onBlur}
                value={inputHook.value}
                type={type}
                placeholder={label}
            />
        </div>
    );
};

const RegisterForm = () => {
    const loginValidation = {
        isEmpty: true,
        minLength: 4,
        login: true,
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
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { error, user } = useSelector((state: RootState) => state.users); // Исправлено

    const handleSubmit = (e: React.FormEvent) => {
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
            const registerData = {
                login: login.value,
                password: passWord.value,
                fullName: fullName.value,
                roleId: 1,
            };
            dispatch(register(registerData)).then((action: any) => {
                if (register.fulfilled.match(action)) {
                    navigate("/login");
                } else if (register.rejected.match(action)) {
                    alert(action.payload || "Registration failed");
                    login.setValue(""); // Используем метод сброса
                    passWord.setValue("");
                    fullName.setValue("");
                }
            });
        }
    };

    return (
        <div className={style.auth_input}>
            <div className={style.auth_input_center}>
                <form onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <InputField inputHook={login} label="Login" type="text" />
                    <InputField
                        inputHook={passWord}
                        label="Password"
                        type="password"
                    />
                    <InputField
                        inputHook={fullName}
                        label="full name"
                        type="text"
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
