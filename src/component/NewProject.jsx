import React, { useEffect, useState } from "react";
import SplitPane from "react-split-pane";
import { FaChevronDown, FaCss3, FaHtml5, FaJs } from "react-icons/fa";
import { FcSettings } from "react-icons/fc";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const NewProject = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setoutput] = useState("");
  console.log(output);

  useEffect(() => {
    getOutput();
  }, [html, css, js]);

  const getOutput = () => {
    const htmlDocumentTemplate = `
    <html>
      <head>
          <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
      
    </html>
    `;
    setoutput(htmlDocumentTemplate);
  };
  return (
    <>
      <div
        className="w-100 h-100d-flex flex-column align-items-start align-content-start justify-content-start overflow-hidden "
        style={{ width: "100vw", height: "100vh" }}
      >
        {/* alert sectoin */}

        {/* header sectoin */}

        {/* codeing section */}
        <div>
          {/* horizontal */}
          <SplitPane
            split="horizontal"
            minSize={100}
            maxSize={-100}
            defaultSize={"50%"}
            style={{ top: "0 !importan" }}
          >
            {/* top coding secton  */}
            <SplitPane split="vertical" minSize={1} defaultSize={500}>
              {/* html code  */}
              <div className="w-100 h-100 d-flex flex-column align-items-start justify-content-start">
                {/* icons */}
                <div className="d-flex  w-100 justify-content-between align-items-center ">
                  <div className="d-flex bg-dark gap-2 justify-content-center border-top px-2 py-1 align-items-center ">
                    <FaHtml5 className="text-danger" />
                    <span className="text-light">HTML</span>
                  </div>
                  <div className="d-flex  gap-2 justify-content-center  px-2 py-1 align-items-center">
                    <FcSettings style={{ cursor: "pointer" }} />
                    <FaChevronDown
                      className="text-white"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
                {/* html code mirror */}
                <div className="w-100">
                  <CodeMirror
                    value={html}
                    height="1000px"
                    theme={"dark"}
                    extensions={[javascript({ jsx: true })]}
                    onChange={(val, viewUpdate) => setHtml(val)}
                  />
                </div>
              </div>

              <SplitPane
                split="vertical"
                minSize={1}
                defaultSize={500}
                maxSize={1000}
              >
                {/* css code */}
                <div className="w-100 h-100 d-flex flex-column align-items-start justify-content-start">
                  {/* icons */}
                  <div className="d-flex  w-100 justify-content-between align-items-center ">
                    <div className="d-flex bg-dark gap-2 justify-content-center border-top px-2 py-1 align-items-center ">
                      <FaCss3 className="text-info" />
                      <span className="text-light">CSS</span>
                    </div>
                    <div className="d-flex  gap-2 justify-content-center  px-2 py-1 align-items-center">
                      <FcSettings style={{ cursor: "pointer" }} />
                      <FaChevronDown
                        className="text-white"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>

                  {/*css code mirror */}
                  <div className="w-100 ">
                    <CodeMirror
                      value={css}
                      height="1000px"
                      theme={"dark"}
                      extensions={[javascript({ jsx: true })]}
                      onChange={(val, viewUpdate) => setCss(val)}
                    />
                  </div>
                </div>

                {/* js code */}
                <div className="w-100 h-100 d-flex flex-column align-items-start justify-content-start">
                  {/* icons */}
                  <div className="d-flex  w-100 justify-content-between align-items-center ">
                    <div className="d-flex bg-dark gap-2 justify-content-center border-top px-2 py-1 align-items-center ">
                      <FaJs className="text-warning" />
                      <span className="text-light">JS</span>
                    </div>
                    <div className="d-flex  gap-2 justify-content-center  px-2 py-1 align-items-center">
                      <FcSettings style={{ cursor: "pointer" }} />
                      <FaChevronDown
                        className="text-white"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>

                  {/*js code mirror */}
                  <div className="h-100 w-100">
                    <CodeMirror
                      value={js}
                      height="1000px"
                      theme={"dark"}
                      extensions={[javascript({ jsx: true })]}
                      onChange={(val, viewUpdate) => setJs(val)}
                    />
                  </div>
                </div>
              </SplitPane>
            </SplitPane>

            {/* bottom result section */}
            <div className="h-100 bg-white overflow-hidden">
              <iframe
                srcDoc={output}
                title="output"
                style={{ border: "none", width: "100%", height: "100%" }}
              ></iframe>
            </div>
          </SplitPane>
        </div>
      </div>
    </>
  );
};

export default NewProject;
