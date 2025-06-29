import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { auth } from '../../firebase';

const ProjectDetails = () => {
  const { id } = useParams(); // get project ID from URL
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, 'projects', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching project:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this project?');
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'projects', id));
      navigate('/'); // 👈 Go to home after deleting
    } catch (error) {
      console.error('Error deleting project:', error.message);
    }
  };

  if (loading) return <div className="container center">Loading...</div>;

  return project ? (
    <div className="container section project-details">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">{project.title}</span>
          <p>{project.content}</p>
        </div>
        <div className="card-action grey lighten-4 grey-text">
          <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
          <div>{project.createdAt?.toDate().toDateString()}</div>
        </div>
        <div className="card-action">
          <button className="btn red" onClick={handleDelete}>
            Delete Project
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="container center">Project not found.</div>
  );
};

export default ProjectDetails;
