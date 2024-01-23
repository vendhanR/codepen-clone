import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion"

const UserAuthInput = ({
  label,
  isPass,
  placeholder,
  Icon,
  setStateFunction,
  setGetEmailValidation
}) => {
  const [value, setValue] = useState("");
  const [showPass, setshowPass] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleInputChange = (e) => {
    setValue(e.target.value);
    setStateFunction(e.target.value);

    if (placeholder === "Email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const status = emailRegex.test(value);
      setIsEmailValid(status);
      setGetEmailValidation(status);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-start align-items-start ">
      <label htmlFor="" className="text-white">
        {label}
      </label>
      <div
        className={`w-100 d-flex flex-grow-1 justify-content-center align-items-center px-2 py-1 bg-white mb-3 ${  
          !isEmailValid &&
          placeholder === "Email" &&
          value.length > 0 &&
          "border border-2 border-danger"
        }`}
      >
        <Icon />
        <input
          type={isPass && showPass ? "password" : "text"}
          className={`w-100  h-100 w-100 flex-grow-1 bg-transparent border-0`}
          style={{ outline: "none" }}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
        />
        {isPass && (
          <motion.div
          whileTap={{scale:0.9}}
            className="btn border-0 p-0"
            onClick={() => setshowPass(!showPass)}
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UserAuthInput;
