import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
};

const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    darkMode: () => {
      return { theme: "dark" };
    },
    lightMode: () => {
      return { theme: "light" };
    },
  },
});

export const { darkMode, lightMode } = ThemeSlice.actions;
export default ThemeSlice.reducer;
