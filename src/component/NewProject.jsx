import React, { useEffect, useState } from "react";
import SplitPane from "react-split-pane";
import { FaChevronDown, FaCss3, FaHtml5, FaJs } from "react-icons/fa";
import { FcSettings } from "react-icons/fc";
import { logoWhite } from "../asset";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import UserProfileDetails from "./UserProfileDetails";
import { Link } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";
import { MdCheck, MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import Alert from "./Alert";

import { BiLogoFirebase } from "react-icons/bi";

const NewProject = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setoutput] = useState("");

  const [title, setTitle] = useState("Untitle");
  const [isTitle, setIsTitle] = useState(false);

  const [alert, setAlert] = useState(false);

  const user = useSelector((state) => state.user?.user);
  const openProject = useSelector((state) => state.projects?.openProject);

  useEffect(() => {
    getOutput();
  }, [html, css, js]);

  const saveProgram = async () => {
    const id = `${Date.now()}`;
    const _doc = {
      id: id,
      title: title,
      html: html,
      css: css,
      js: js,
      output: output,
      user: user,
    };
    
    await setDoc(doc(db, "Projects", id), _doc)
      .then(() => {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  // console.log(openProject.html);
  useEffect(()=>{
    if(openProject){
      setHtml(openProject.html);
      setCss(openProject.css);
      setJs(openProject.js)
      setTitle(openProject.title)
    }
  },[])

  const getOutput = () => {
    const htmlDocumentTemplate = `
    <html>
      <head>
          <style>${css}
          </style>
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
        {alert && (
          <AnimatePresence>
            <Alert status="success" alerMsg="Project added..." />
          </AnimatePresence>
        )}

        {/* header sectoin */}
        <header
          className="w-full px-4 d-flex justify-content-between align-items-center "
          style={{ height: "4rem" }}
        >
          <div className="d-flex gap-2 justify-content-center align-items-center">
            {/* logo */}
            <Link to={"/home"}>
              <img style={{ width: "2rem" }} src={logoWhite} alt="logo" />
            </Link>
            <div className="d-flex flex-column justify-content-center align-items-start">
              {/* title */}
              <div className="d-flex   align-items-center justify-content-start gap-3">
                <AnimatePresence>
                  {isTitle ? (
                    <>
                      <motion.input
                        value={title}
                        key="titleInput"
                        type="text"
                        placeholder="Your title"
                        className="bg-transparent w-50 text-white border-0"
                        style={{ outline: "none", fontWeight: "bold" }}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <motion.p
                        className="pt-3  text-white"
                        style={{ fontWeight: "bold" }}
                      >
                        {title}
                      </motion.p>
                    </>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {isTitle ? (
                    <>
                      <motion.p
                        whileTap={{ scale: 0.9 }}
                        key={"MdCheck"}
                        className="pt-3"
                        onClick={() => setIsTitle(false)}
                      >
                        <MdCheck
                          style={{ fontSize: "1.2rem", cursor: "pointer" }}
                          className="text-secondary "
                        />
                      </motion.p>
                    </>
                  ) : (
                    <>
                      <motion.p
                        whileTap={{ scale: 0.9 }}
                        key={"MdEdit"}
                        className="pt-3"
                        onClick={() => setIsTitle(true)}
                      >
                        <MdEdit
                          style={{ fontSize: "1.2rem", cursor: "pointer" }}
                          className="text-secondary "
                        />
                      </motion.p>
                    </>
                  )}
                </AnimatePresence>
              </div>
              <div
                className=" d-flex gap-2 text-capitalize"
                style={{ marginTop: "-1rem", fontSize: "0.8rem" }}
              >
                <p className="text-white ">
                  {user?.displayName
                    ? user?.displayName
                    : `${user?.email.split("@")[0]}`}
                </p>
                {/* <motion.p
                  whileTap={{ scale: 0.9 }}
                  className="bg-success px-2 rounded text-white font-monospace"
                  style={{ cursor: "pointer" }}
                >
                  + follow
                </motion.p> */}
              </div>
            </div>
          </div>
          {/*User profile */}
          {user && (
            <div className="d-flex gap-2 ">
              <motion.button
                onClick={saveProgram}
                whileTap={{ scale: 0.9 }}
                className="btn btn-secondary"
              >
                <BiLogoFirebase />
                save
              </motion.button>
              <UserProfileDetails />
            </div>
          )}
        </header>

        {/* codeing section */}
        <div style={{ width: "100vw" }}>
          {/* horizontal */}
          <SplitPane
            split="horizontal"
            minSize={100}
            maxSize={-100}
            defaultSize={"50%"}
          >
            {/* top coding secton  */}
            <SplitPane split="vertical" minSize={1} defaultSize={"34%"}>
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
                <div className="w-100 overflow-auto">
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
                defaultSize={"50%"}
                maxSize={"100%"}
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
                  <div className="w-100 overflow-scroll">
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
                  <div className="h-100 w-100 overflow-scroll">
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
