import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../features/project/projectSlice";
import ProjectList from "../projects/ProjectList";
import Notification from "./Notification";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((s) => s.project);
  const { user } = useSelector((s) => s.auth);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    const fetchNotes = async () => {
      const q = query(collection(db, "notifications"), orderBy("time", "desc"));
      const snap = await getDocs(q);
      setNotifications(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetchNotes();
  }, []);

  return (
    <div className="dashboard container">
      <div className="row">
        <div className="col s12 m6">
          {loading && <p>Loading projects...</p>}
          {error && <p className="red-text">Error: {error}</p>}

          {!loading && !error && <ProjectList projects={projects} />}
        </div>
        <div className="col s12 m5 offset-m1">
          <Notification notifications={notifications} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
