import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { MdBookmark } from "react-icons/md";
import style from "./projectCard.module.css";
import { openExistingProject } from "../store/slices/projectSlice";

const ProjectCard = ({ project, index }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenProject = () => {
    dispatch(openExistingProject(project));
    navigate("/newProject");
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      key={index}
      style={{ cursor: "pointer" }}
      className={`bg-dark  px-2 d-flex justify-content-center align-items-center flex-column rounded gap-2 pt-2 ${style.card}`}
    >
      <div
        className="h-100 scrollable-div w-100 rounded "
        style={{ overflow: "auto", height: "100%" }}
      >
        <iframe
          srcDoc={project.output}
          title="output"
          style={{ border: "none", width: "100%", height: "100%" }}
        />
      </div>
      <div className="d-flex justify-content-start align-items-center w-100 gap-2 pb-1">
        <div
          className="d-flex justify-content-center align-items-center rounded overflow-hidden bg-success "
          style={{ width: "2.5rem", height: "2.5rem" }}
        >
          {project?.user?.photoURL ? (
            <>
              <img
                src={project?.user?.photoURL}
                className="object-fit-cover w-100 h-100"
              />
            </>
          ) : (
            <>
              <p className="text-capitalize text-white d-flex justify-content-center align-items-center w-100 h-100 pt-3 px-3">
                <span style={{ fontSize: "1.4rem" }}>
                  {project?.user?.email[0]}
                </span>
              </p>
            </>
          )}
        </div>
        <div
          className="d-flex justify-content-between  w-100 align-items-center"
          onClick={handleOpenProject}
        >
          <div>
            <p className="text-white p-0 m-0" alert>
              {project?.title}
            </p>
            <p className="text-white-50 p-0 m-0">
              {project?.user?.displayName
                ? project?.user?.displayName
                : `${project?.user?.email.split("@")[0]}`}
            </p>
          </div>
          <motion.div style={{ cursor: "pointer" }} whileTap={{ scale: "0.9" }}>
            <MdBookmark className="text-white-50 " />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
