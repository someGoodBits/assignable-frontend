import "./custom-input.scss";
import FeatherIcon from "feather-icons-react";
import { useState } from "react";

const CustomInput = ({ label, name, type, value, errors, register, placeholder = "", required }) => {
    const [showPassword, setShowPassword] = useState(false);

    function togglePasswordVisibility(){
        setShowPassword(s => !s)
    }

    return (
        <div className="bg-200 p-3 rounded-3 position-relative">
            <label className="d-block text-500 fw-bolder mb-1" htmlFor={name}>
                {label}
            </label>
            <input
                style={{ outline: "none" }}
                className="bg-transparent border-0 text-900 w-100 custom-input"
                name={name}
                id={name}
                type={type === "password" ? (showPassword ? "text" : "password" ) : (type)}
                value={value}
                placeholder={placeholder}
                {...register(name, { required })}
            />
            {errors && errors[name] && (
                <div className="position-absolute" style={{ top: "0.8rem", right: type === "password" ? "3rem" : "1rem" }}>
                    <FeatherIcon width="18px" icon="info" color="var(--bs-danger)" />
                </div>
            )}

            {type === "password" && (
                <div 
                    className="position-absolute cursor-pointer" 
                    style={{ top: "0.8rem", right: "0.8rem",width:"1.5rem", height:"1.5rem" }}
                    onClick={togglePasswordVisibility}
                >
                    <FeatherIcon width="18px" icon={showPassword?"eye-off":"eye"} color="var(--bs-neutral-500)" />
                </div>
            )}
        </div>
    );
};

export default CustomInput;
