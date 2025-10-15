import { configureStore } from "@reduxjs/toolkit";
import patientsReducer from "./features/patientStore";

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
  },
});