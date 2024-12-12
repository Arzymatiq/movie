import React from "react";
import { useInput } from "../../hoks/useInput";
import style from "./logForm.module.scss";
import { loginFunc } from "../../store/user/userAction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useBooleanInput } from "../../hoks/useBooleanInput";

interface InputFieldProps {
    inputHook: {
        dirty: boolean;
        isEmpty: boolean;
        minLengthError?: boolean;
        loginError?: boolean;
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onBlur: () => void;
    };
    label: string;
    type: string;
}

const InputField: React.FC<InputFieldProps> = ({ inputHook, label, type }) => {
    return (
        <div>
            {inputHook.dirty && inputHook.isEmpty && (
                <div className={style.error}>Поле не может быть пустым</div>
            )}
            {inputHook.dirty && inputHook.minLengthError && (
                <div className={style.error}>
                    Поле должно быть минимум 4 символа
                </div>
            )}
            {inputHook.dirty && inputHook.loginError && (
                <div className={style.error}>Введите корректный login</div>
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

    const dispatch = useDispatch<AppDispatch>();
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
            const loginData = {
                login: login.value,
                password: passWord.value,
                isAgreeToManagmentData: agreeToDataManagement.value,
            };
            try {
                const action = await dispatch(loginFunc(loginData));
                if (loginFunc.fulfilled.match(action)) {
                    navigate("/");
                } else {
                    alert(action.payload || "Login failed");
                    login.setValue("");
                    passWord.setValue("");
                }
            } catch (err) {
                console.error("Ошибка логина", err);
            }
        }
    };
    // // console.log(user, loading, error,);
    // console.log(token);

    return (
        <div className={style.auth_input}>
            <div className={style.auth_input_center}>
                <form onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <InputField inputHook={login} label="Login" type="text" />
                    <InputField
                        inputHook={passWord}
                        label="Password"
                        type="password"
                    />
                    <div>
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
                            I agree to data management
                        </label>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
