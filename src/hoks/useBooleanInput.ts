import { useState } from "react";

export const useBooleanInput = (initialValue: boolean) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.checked);
    };

    return { value, setValue, onChange };
};
