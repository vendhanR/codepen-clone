import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProjectCard from "../component/ProjectCard";

const Projects = () => {
  const projects = useSelector((state) => state.projects?.projects);
  const searchTerm = useSelector((state) => state.searchTerm?.searchTerm);

  const [filtered, setFiltered] = useState([]);

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
      setFiltered("");
    }
  }, [searchTerm]);

  return (
    <div className="w-100 d-flex gap-3 flex-wrap justify-content-center align-items-center py-3 overflow-auto">
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

export default Projects;
