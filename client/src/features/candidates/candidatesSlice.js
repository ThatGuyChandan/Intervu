import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchCandidates = createAsyncThunk(
  'candidates/fetchAll',
  async () => {
    const response = await axios.get(`${API_URL}/candidates`);
    return response.data;
  }
);

export const fetchCandidateById = createAsyncThunk(
  'candidates/fetchById',
  async (id) => {
    const response = await axios.get(`${API_URL}/candidates/${id}`);
    return response.data;
  }
);

const initialState = {
  list: [],
  selectedCandidate: null,
  loading: false,
  error: null,
};

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCandidateById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCandidateById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCandidate = action.payload;
      })
      .addCase(fetchCandidateById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default candidatesSlice.reducer;
