import { useState } from "react";
import { useValidation } from "./useValidation";

export const useBooleanInput = (initialValue: boolean) => {
    const [value, setValue] = useState(initialValue);
    const [dirty, setDirty] = useState<boolean>(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.checked);
    };

    const onBlur = () => {
        setDirty(true);
    };

    return { value, onChange, onBlur, setDirty, setValue, dirty };
};
