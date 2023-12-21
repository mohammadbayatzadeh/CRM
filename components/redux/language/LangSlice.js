import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: "en",
};

const LangSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    ENLanguage: () => {
      return { lang: "en" };
    },
    FALanguage: () => {
      return { lang: "fa" };
    },
  },
});

export const { ENLanguage, FALanguage } = LangSlice.actions;
export default LangSlice.reducer;
