import React from "react";
import SplitPane from "react-split-pane";
import { FaCss3, FaHtml5 } from "react-icons/fa";
import { FcSettings } from "react-icons/fc";

const NewProject = () => {
  return (
    <>
      <div
        className="d-flex flex-column align-items-start align-content-start justify-content-start overflow-hidden "
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
            <SplitPane split="vertical" minSize={500}>
              {/* html code  */}

            
              <SplitPane split="vertical" minSize={500}>
                {/* css code */}

                {/* js code */}
              </SplitPane>
            </SplitPane>
            <div></div>

            {/* bottom result section */}
          </SplitPane>
        </div>
      </div>
    </>
  );
};

export default NewProject;
