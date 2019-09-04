const findProp = function findProp(obj, prop, defval) {
  if (typeof defval == "undefined") defval = null;
  prop = prop.split(".");

  for (var i = 0; i < prop.length; i++) {
    if (typeof obj[prop[i]] == "undefined") return defval;
    obj = obj[prop[i]];
  }

  return obj;
};

function findByPropVal(o, prop, val, retprop) {
  if (o == null) return false;

  if (o[prop] === val) {
    return retprop ? o[retprop] : o;
  }

  var result, p;

  for (p in o) {
    if (o.hasOwnProperty(p) && typeof o[p] === 'object') {
      result = findByPropVal(o[p], prop, val);

      if (result) {
        return retprop ? result[retprop] : result;
      }
    }
  }

  return retprop ? result[retprop] : result;
}

function findByPropKey(o, prop) {
  if (o == null) return false;

  if (o.hasOwnProperty(prop)) {
    return o[prop];
  }

  var result, p;

  for (p in o) {
    if (o.hasOwnProperty(p) && typeof o[p] === 'object') {
      result = findByPropKey(o[p], prop);

      if (result) {
        return result;
      }
    }
  }

  return result;
}

export default findProp;
export { findByPropVal, findByPropKey };