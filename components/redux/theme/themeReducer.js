const initialState = {
  theme: "dark",
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DARK":
      return { theme: "dark" };
    case "LIGHT":
      return { theme: "light" };
    default:
      return state;
  }
};

export { themeReducer };
