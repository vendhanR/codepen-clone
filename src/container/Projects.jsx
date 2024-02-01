import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { MdBookmark } from "react-icons/md";

const Projects = () => {
  const projects = useSelector((state) => state.projects?.projects);
  const searchTerm = useSelector((state) => state.searchTerm?.searchTerm);

  const [filtered, setFiltered] = useState([]);
  console.log("projects -> ", projects);
  console.log("search item -> ", searchTerm);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setFiltered(
        projects?.filter((project) => {
          const titleInLowerCase = project?.title.toLowerCase();
          return searchTerm
            .split("")
            .every((letter) => titleInLowerCase.includes(letter));
        })
      );
    } else {
      setFiltered("")
    }
  }, [searchTerm]);

  return (
    <div className="w-100 d-flex gap-4 flex-wrap justify-content-center align-items-start py-3 overflow-auto">
      {filtered ? (
        <>
          {filtered &&
            filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </>
      ) : (
        <>
          {projects &&
            projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </>
      )}
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
      transition={{duration : 0.5,delay : index * 0.1}}
      key={index}
      className="bg-dark p-2 d-flex justify-content-center align-items-center flex-column rounded"
      style={{ width: "400px", height: "325px", cursor: "pointer" }}
    >
      <div
        className="h-100 w-100 bg-secondary overflow-hidden rounded "
        style={{ overflow: "hidden" }}
      >
        <iframe
          srcDoc={project.output}
          title="output"
          style={{ border: "none", width: "100%", height: "100%" }}
        />
      </div>
      <div className="d-flex justify-content-start align-items-center w-100 gap-2 p-2">
        <div
          className="d-flex justify-content-center align-items-center rounded-circle overflow-hidden bg-secondary "
          style={{ width: "3rem", height: "3rem" }}
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
        <div className="d-flex justify-content-between  w-100 align-items-center">
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
export default Projects;
