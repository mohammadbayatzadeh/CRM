const initialValue = {
  lang: "en",
};

const LanguageReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "EN":
      return { lang: "en" };
    case "FA":
      return { lang: "fa" };
    default:
      return state;
  }
};

export default LanguageReducer;
