import React from "react";
import { FaChevronDown, FaHtml5 } from "react-icons/fa";
import { FcSettings } from "react-icons/fc";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const CodingSection = ({ title, code, setStateFunction, Icon }) => {
  return (
    <div className="w-100 h-100 d-flex flex-column align-items-start justify-content-start">
      {/* icons */}
      <div className="d-flex  w-100 justify-content-between align-items-center ">
        <div className="d-flex bg-dark gap-2 justify-content-center border-top px-2 py-1 align-items-center ">
          <Icon
            className={`${
              title === "HTML"
                ? " text-danger "
                : title === "CSS"
                ? "text-info"
                : "text-warning"
            }`}
          />
          <span className="text-light">{title}</span>
        </div>
        <div className="d-flex  gap-2 justify-content-center  px-2 py-1 align-items-center">
          <FcSettings style={{ cursor: "pointer" }} />
          <FaChevronDown className="text-white" style={{ cursor: "pointer" }} />
        </div>
      </div>
      {/* html code mirror */}
      <div className="w-100 overflow-auto">
        <CodeMirror
          value={code}
          height="1000px"
          theme={"dark"}
          extensions={[javascript({ jsx: true })]}
          onChange={(val, viewUpdate) => setStateFunction(val)}
        />
      </div>
    </div>
  );
};

export default CodingSection;
