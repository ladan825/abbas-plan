import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, auth } from '../../firebase';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  Timestamp
} from 'firebase/firestore';

// ✅ Fetch all projects
export const fetchProjects = createAsyncThunk(
  'project/fetchProjects',
  async (_, thunkAPI) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));

      const projects = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate().toISOString() || null, // 🔁 serialize timestamp
        };
      });

      return projects;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ✅ Create new project (with profile info)
export const createProject = createAsyncThunk(
  'project/createProject',
  async (projectData, thunkAPI) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('User not authenticated');

      const uid = currentUser.uid;
      const profileRef = doc(db, 'users', uid);
      const profileSnap = await getDoc(profileRef);

      if (!profileSnap.exists()) {
        throw new Error('User profile not found in Firestore');
      }

      const profile = profileSnap.data();

      const createdAt = Timestamp.now();

      const newProject = {
        ...projectData,
        authorId: uid,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        initials: profile.initials,
        createdAt,
      };

      const docRef = await addDoc(collection(db, 'projects'), newProject);

      return {
        id: docRef.id,
        ...newProject,
        createdAt: createdAt.toDate().toISOString(), // 🔁 serialized
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// 🔧 Slice
const projectSlice = createSlice({
  name: 'project',
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create project
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default projectSlice.reducer;
