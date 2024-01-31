import React from "react";
import { motion } from "framer-motion";

const Alert = ({ status,alerMsg }) => {
  return (
    <motion.div
      className="position-fixed  z-3"
      style={{ right: "8rem", top: "4rem" }}
    >
      {status === "success" && <p className="bg-success px-3 rounded py-2">{alerMsg}</p>}
      {status === "waring" && <p className="bg-success px-3 rounded py-2">{alerMsg}</p>}
      {status === "danger" && <p className="bg-success px-3 rounded py-2">{alerMsg}</p>}
    </motion.div>
  );
};

export default Alert;
