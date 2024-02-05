import React from "react";
import { motion } from "framer-motion";

const Alert = ({ status, alerMsg }) => {
  console.log(status,alerMsg)
  return (
    <motion.div
      className="position-fixed z-3 text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      style={{ right: "8rem", top: "4rem" }}
    >
      {status === "success" && (
        <p className="bg-success px-3 rounded py-2">{alerMsg}</p>
      )}
      {status === "warning" && (
        <p className="bg-warning  px-3 rounded py-2">{alerMsg}</p>
      )}
      {status === "danger" && (
        <p className="bg-danger px-3 rounded py-2">{alerMsg}</p>
      )}
    </motion.div>
  );
};

export default Alert;
