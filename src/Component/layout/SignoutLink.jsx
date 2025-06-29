import { NavLink } from 'react-router-dom'

const Signout = () => {
    return (
        <ul className="right">
             <li><NavLink to='/signup'>Signup</NavLink></li>
             <li><NavLink to='/signin'>Login</NavLink></li>
        </ul>
      );
}
 
export default Signout;