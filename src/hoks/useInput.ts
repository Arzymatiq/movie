import { useState } from "react";
import { useValidation } from "./useValidation";

interface ValidationRules {
    isEmpty?: boolean;
    minLength?: number;
}

export const useInput = (initialValue: string, validation: ValidationRules) => {
    const [value, setValue] = useState<string>(initialValue);
    const [dirty, setDirty] = useState<boolean>(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const onBlur = () => {
        setDirty(true);
    };

    const valid = useValidation(value, validation);

    return {
        value,
        onChange,
        onBlur,
        setDirty,
        setValue,
        dirty,
        ...valid,
    };
};
