import { configureStore } from "@reduxjs/toolkit";
import LangSlice from "./language/LangSlice";
import ThemeSlice from "./theme/ThemeSlice";
const store = configureStore({
  lange: LangSlice,
  theme: ThemeSlice,
});

export { store };
