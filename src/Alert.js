import React, { useEffect } from "react";

export function Alert({ type, message, showAlert }) {
    useEffect(() => {
        const showTime = setTimeout(() => {
            showAlert(false, "", "");
        }, 2000);
        return () => clearTimeout(showTime);
    });
    return (
        <div className={`alert ${type}`}>{message}</div>
    )
}