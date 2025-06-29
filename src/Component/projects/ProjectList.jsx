import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProjectSummary from './ProjectSummary';

const ProjectList = () => {
  const projects = useSelector((state) => state.project.projects);

  return (
    <div className="project-list section">
      {projects && projects.length > 0 ? (
        projects.map((project) => (
          <Link to={'/project/' + project.id} key={project.id}>
            <ProjectSummary project={project} />
          </Link>
        ))
      ) : (
        <p>No projects found</p>
      )}
    </div>
  );
};

export default ProjectList;
