import { configureStore } from "@reduxjs/toolkit";
import LangSlice from "./language/LangSlice";
const store = configureStore({
  lange: LangSlice,
});

export { store };
