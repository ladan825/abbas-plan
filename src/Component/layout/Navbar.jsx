import { Link } from 'react-router-dom'
import SigninLink from "./SigninLink";
import SignoutLink from "./SignoutLink";
import { useSelector } from 'react-redux';

const Navbar = () => {
        const { user } = useSelector((state) => state.auth);
    return (
        <nav className="nav-wrapper grey darken-3">
                <div className="container">
                    <Link to='/' className="brand-logo">Abbasplan</Link>
                    {/* 🔁 Switch links based on auth */}
        {user ? <SigninLink /> : <SignoutLink />}
                </div>
        </nav>
      );
}
 
export default Navbar;