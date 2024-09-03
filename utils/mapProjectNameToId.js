export const mapProjectNameToId = (projects, projectName) => {
  const project = projects.find((project) => projectName === project.project);
  const projectId = project ? project.id : null;
  return projectId;
};
