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
import CodingSection from "./CodingSection";

const NewProject = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setoutput] = useState("");

  const [title, setTitle] = useState("Untitle");
  const [isTitle, setIsTitle] = useState(false);

  const [alert, setAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("success");
  const [alertMsg, setAlertMsg] = useState("Project added...");

  const user = useSelector((state) => state.user?.user);
  const openProject = useSelector((state) => state.projects?.openProject);

  useEffect(() => {
    getOutput();
  }, [html, css, js]);

  useEffect(() => {
    if (openProject) {
      setHtml(openProject.html);
      setCss(openProject.css);
      setJs(openProject.js);
      setTitle(openProject.title);
    }
  }, []);

  const saveProgram = async () => {
    if (!user) {
      setAlert(true);
      setAlertStatus("warning");
      setAlertMsg("To save, please log in first...");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    } else {
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
      setAlert(true);
      await setDoc(doc(db, "Projects", id), _doc)
        .then(() => {
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 2000);
        })
        .catch((err) => console.log(err));
    }
  };

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
            <Alert status={alertStatus} alerMsg={alertMsg} />
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
                {openProject && (
                  <motion.p
                    whileTap={{ scale: 0.9 }}
                    className="bg-success px-2 rounded text-white font-monospace"
                    style={{ cursor: "pointer" }}
                  >
                    + follow
                  </motion.p>
                )}
              </div>
            </div>
          </div>
          {/*User profile */}
          <div className="d-flex gap-2 ">
            <motion.button
              onClick={saveProgram}
              whileTap={{ scale: 0.9 }}
              className="btn btn-secondary"
            >
              <BiLogoFirebase />
              save
            </motion.button>
            {!user && (
              <Link
                to={"/home/auth"}
                className="text-white text-decoration-none bg-success p-2 rounded"
              >
                login
              </Link>
            )}
            {user && <UserProfileDetails />}
          </div>
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
            <SplitPane split="vertical" minSize={1} defaultSize={"34%"} >
              {/* html code  */}
              <CodingSection
                title={"HTML"}
                code={html}
                setStateFunction={setHtml}
                Icon={FaHtml5}
              />
              <SplitPane
                split="vertical"
                minSize={1}
                defaultSize={"50%"}
                maxSize={"100%"}
              >
                {/* css code */}
                <CodingSection
                  title={"CSS"}
                  code={css}
                  setStateFunction={setCss}
                  Icon={FaCss3}
                />
                {/* js code */}
                <CodingSection
                  title={"JS"}
                  code={js}
                  setStateFunction={setJs}
                  Icon={FaJs}
                />
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
