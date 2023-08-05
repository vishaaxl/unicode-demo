import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CounterState = {
  departments: string[];
  industries: string[];
  technologies: string[];
};

const initialState = {
  departments: [""],
  industries: [""],
  technologies: [""],
} as CounterState;

export const form = createSlice({
  name: "form",
  initialState,
  reducers: {
    reset: () => initialState,
    updateFormValues: (state, action) => {
      state.departments = action.payload.formValue.departments;
      state.industries = action.payload.formValue.industries;
      state.technologies = action.payload.formValue.technologies;
    },
  },
});

export const { reset, updateFormValues } = form.actions;
export default form.reducer;
