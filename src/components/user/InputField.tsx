import { red } from "@mui/material/colors";
import React, { FC } from "react";

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

export const InputField: FC<InputFieldProps> = ({ inputHook, label, type }) => {
    const getErrorMessage = () => {
        if (inputHook.dirty && inputHook.isEmpty) {
            return (
                <div style={{ color: "red" }}>Поле не может быть пустым</div>
            );
        }
        if (inputHook.dirty && inputHook.minLengthError) {
            return (
                <div style={{ color: "red" }}>
                    Поле должно быть минимум 4 символа
                </div>
            );
        }
        if (inputHook.dirty && inputHook.loginError) {
            return <div style={{ color: "red" }}>Введите корректный login</div>;
        }
        return null;
    };

    const errorMessage = getErrorMessage();

    return (
        <div>
            {errorMessage && <div>{errorMessage}</div>}
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
