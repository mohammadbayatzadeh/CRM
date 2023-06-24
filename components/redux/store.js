import { createStore } from "redux";
import { themeReducer } from "./theme/themeReducer";

const store = createStore(themeReducer);

export { store };
