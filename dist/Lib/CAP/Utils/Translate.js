import Lodash from "./Lodash";
import Parser from "./Parser";
const Messages = JSON.parse(window.localStorage.getItem("language") || "{\"language\":\"tr-TR\"}");

const Translate = (text, params = {}, html = true) => {
  if (!text) return "";

  if (!Lodash.isEmpty(Messages)) {
    if (!Lodash.isEmpty(Messages[text])) {
      text = Messages[text];
    }
  }

  if (html) {
    return Parser(text.allReplace(params));
  } else {
    return text.allReplace(params);
  }
};

export default Translate;