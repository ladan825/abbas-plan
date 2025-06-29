import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../features/auth/authSlice';
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the logIn thunk
    dispatch(logIn({ email, password }))
      .unwrap()
      .then(() => {
        // ✅ Redirect to dashboard or home on success
        navigate('/');
      })
      .catch((err) => {
        // ❌ Error already handled in Redux, optional local use
        console.error('Login failed:', err);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="white">
        <h5 className="grey-text text-darken-3">Sign In</h5>

        <div className="input-field">
          <label htmlFor="email" className="active">Email</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-field">
          <label htmlFor="password" className="active">Password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        {/* 🔴 Show login error from Redux state */}
        {error && (
          <div className="red-text center">
            <p>{error}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignIn;
