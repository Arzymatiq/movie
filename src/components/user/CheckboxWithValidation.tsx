import React from "react";

interface CheckboxProps {
    inputHook: {
        value: boolean; // Для чекбокса значение — булево
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onBlur: () => void;
    };
    label: string; // Текст для подписи
    error?: string; // Сообщение об ошибке
}

export const CheckboxWithValidation: React.FC<CheckboxProps> = ({
    inputHook,
    label,
    error,
}) => {
    return (
        <div style={{ marginBottom: "1rem" }}>
            <label>
                <input
                    type="checkbox"
                    checked={inputHook.value}
                    onChange={inputHook.onChange}
                    onBlur={inputHook.onBlur}
                />
                {label}
            </label>
            {error && (
                <div style={{ color: "red", marginTop: "0.5rem" }}>{error}</div>
            )}
        </div>
    );
};
