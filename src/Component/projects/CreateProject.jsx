import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createProject } from "../../features/project/projectSlice";
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.project);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const project = { title, content };

    // ✅ Dispatch thunk and handle result
    dispatch(createProject(project))
      .unwrap()
      .then(() => {
        // clear form
        setTitle('');
        setContent('');
        // redirect to dashboard
        navigate('/');
      })
      .catch((err) => {
        console.error('❌ Project creation failed:', err);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="white">
        <h5 className="grey-text text-darken-3">Create Project</h5>

        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="input-field">
          <label htmlFor="content">Project Content</label>
          <textarea
            id="content"
            className="materialize-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        {error && <p className="red-text">{error}</p>}

        <div className="input-field">
          <button
            className="btn pink lighten-1 z-depth-0"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
