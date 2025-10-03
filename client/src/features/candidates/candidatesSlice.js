import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCandidates as fetchCandidatesAPI, fetchCandidateById as fetchCandidateByIdAPI } from '../services/api';

export const fetchCandidates = createAsyncThunk(
  'candidates/fetchAll',
  async () => {
    const response = await fetchCandidatesAPI();
    return response;
  }
);

export const fetchCandidateById = createAsyncThunk(
  'candidates/fetchById',
  async (id) => {
    const response = await fetchCandidateByIdAPI(id);
    return response;
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