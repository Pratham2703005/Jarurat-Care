import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPatients = createAsyncThunk("patients/fetch", async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  return res.data;
});

const patientsSlice = createSlice({
  name: "patients",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    addPatient: (state, action) => {
      // Expect action.payload to be a patient object
      state.data.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => { state.status = "loading"; })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addPatient } = patientsSlice.actions;
export default patientsSlice.reducer;
