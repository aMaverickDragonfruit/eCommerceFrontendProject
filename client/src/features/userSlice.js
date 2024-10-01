import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

const initialState = {
  user: {},
  token: '',
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunk actions
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', data);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

export const createUser = createAsyncThunk(
  'user/createUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/users', data);
      return response.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || 'An error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getCurrentUser: (state, action) => {
      state.isAuthenticated = !!Object.keys(action.payload.user).length;
      const user = {
        _id: action.payload.user.id,
        isVender: action.payload.user.isVender,
        products: action.payload.user.products,
      };
      state.user = user;
    },
    signOutUser: (state) => {
      state.isAuthenticated = false;
      state.user = {};
      state.loading = false;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      //fetch User
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isAuthenticated = !!Object.keys(action.payload.user).length;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      //create User
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { signOutUser, getCurrentUser } = userSlice.actions;

export default userSlice.reducer;
