import Lodash from "./Lodash";
import Parser from "./Parser";
const Messages = JSON.parse(window.localStorage.getItem("languageTranslate") || "{}");

/**
 *
 * @param text
 * @param params
 * @param html
 * @returns {*}
 * @constructor
 */
const Translate = (text, params = {}, html = true) => {

  if (!text) return "";


  if (!Lodash.isEmpty(Messages["languageTranslate"])) {
    if (!Lodash.isEmpty(Messages["languageTranslate"][text])) {
      text = Messages["languageTranslate"][text];
    }
  }


  if (html) {
     return  Parser(text.allReplace(params))  ;
     //return ReactDOMServer.renderToStaticMarkup(Utils.Parser(text.allReplace(params))) ;
  } else {
    return text.allReplace(params);
  }
};
export default Translate;