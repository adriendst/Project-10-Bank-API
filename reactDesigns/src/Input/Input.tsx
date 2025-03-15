import React from "react";
import "./Input.scss";

function Input({
    type,
    value,
    setValue,
    label,
}: {
    type: string;
    value: string | boolean;
    setValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
}) {
    return (
        <div className={`input-${type === "checkbox" ? "remember" : "wrapper"}`}>
            <label>{label}</label>
            {type === "checkbox" ? (
                <input type={type} checked={Boolean(value)} onChange={setValue} />
            ) : (
                <input type={type} value={String(value)} onChange={setValue} required />
            )}
        </div>
    );
}

export default Input;
