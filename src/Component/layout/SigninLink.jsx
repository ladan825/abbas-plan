import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../features/auth/authSlice';
import { useSelector } from 'react-redux'

const Signin = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
   const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logOut())
      .unwrap()
      .then(() => console.log("✅ Logged out"))
      .catch((err) => console.error("❌ Logout failed:", err));
    navigate('/'); // redirect after logout (optional)
    
  };
    return (
        <ul className="right">
             <li><NavLink to='/create'>New project</NavLink></li>
             <li>
  <button onClick={handleLogout} className="btn pink lighten-1 z-depth-0">Log out</button>
</li>

             <li><NavLink to='/' className='btn btn-floating lighten-1'>{user?.initials || 'U'}</NavLink></li>
        </ul>
      );
}
 
export default Signin;