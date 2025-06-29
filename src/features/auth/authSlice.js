import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

import { auth, db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

// 🔠 Helper to extract initials from full name
const getInitials = (firstName, lastName) => {
  const f = firstName?.[0] || '';
  const l = lastName?.[0] || '';
  return (f + l).toUpperCase();
};

// 🔐 Sign Up Thunk
export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password, firstName, lastName }, thunkAPI) => {
    try {
      const displayName = `${firstName} ${lastName}`;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Set display name in Firebase Auth
      await updateProfile(userCredential.user, { displayName });

      const uid = userCredential.user.uid;
      const initials = getInitials(firstName, lastName);

      // Save user profile in Firestore
      await setDoc(doc(db, 'users', uid), {
        firstName,
        lastName,
        displayName,
        email,
        initials,
        createdAt: new Date()
      });

      return {
        uid,
        email,
        displayName,
        initials
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 🔑 Login Thunk
export const logIn = createAsyncThunk(
  'auth/logIn',
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const [firstName, lastName] = user.displayName?.split(' ') || ['User', ''];
      const initials = getInitials(firstName, lastName);

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        initials
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 🚪 Logout Thunk
export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 🔧 Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,         // { uid, email, displayName, initials }
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // signUp
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // logIn
      .addCase(logIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // logOut
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  }
});

export default authSlice.reducer;
