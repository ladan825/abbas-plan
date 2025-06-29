import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../features/auth/authSlice";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signUp({ email, password, firstName, lastName }))
      .unwrap()
      .then(async (user) => {
        await addDoc(collection(db, "notifications"), {
          message: `${user.displayName} joined the party`,
          time: Timestamp.now()
        });
        navigate("/");
      })
      .catch((err) => console.error("Signup failed:", err));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="white">
        <h5 className="grey-text text-darken-3">Sign Up</h5>

        {/* First & Last Name */}
        <div className="input-field">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="input-field">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {/* Email & Password */}
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div className="red-text center">{error}</div>}

        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
