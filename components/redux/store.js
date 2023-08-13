import { combineReducers, createStore } from "redux";
import { themeReducer } from "./theme/themeReducer";
import LanguageReducer from "./language/LanguageReducer";

const RootReducer = combineReducers({
  theme: themeReducer,
  language: LanguageReducer,
});

const store = createStore(RootReducer);

export { store };
