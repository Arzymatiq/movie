import { useEffect, useState } from "react";

interface ValidationRules {
    isEmpty?: boolean;
    minLength?: number;
    isEmail?: boolean;
}

export const useValidation = (value: string, validation: ValidationRules) => {
    const [isEmpty, setEmpty] = useState<boolean>(true);
    const [minLengthError, setMinLengthError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);

    useEffect(() => {
        if (validation.isEmpty) {
            setEmpty(value.trim() === "");
        }

        if (validation.minLength) {
            setMinLengthError(value.length < validation.minLength);
        }

        if (validation.isEmail) {
            const emailRegex =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            setEmailError(!emailRegex.test(value));
        }
    }, [value, validation]);

    return {
        isEmpty,
        minLengthError,
        emailError,
    };
};
