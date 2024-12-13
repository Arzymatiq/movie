import React from "react";
import style from "./logForm.module.scss";

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
export default InputField;
