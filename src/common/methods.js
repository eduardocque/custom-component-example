export function ParamsFromURL(query = undefined) {
  query = query || window.location.search;
  const queryString = {};
  if (query.length === 0) {
    return queryString;
  }

  const vars =query.split("&");
  for (let i = 0; i < vars.length; i++) {
    const stringArr = vars[i].split("=");
    const pair = stringArr.map(item => item.replace("?", ""));
    const key = decodeURIComponent(pair[0]);
    const value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof queryString[key] === "undefined") {
      queryString[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof queryString[key] === "string") {
      const arr = [queryString[key], decodeURIComponent(value)];
      queryString[key] = arr;
      // If third or later entry with this name
    } else {
      queryString[key].push(decodeURIComponent(value));
    }
  }
  return queryString;
}

export function buildInitialValueObjectFromParams(tagPostfix) {
  const params = ParamsFromURL() || {};
  const sortedParams = Object.keys(params).reduce((acc, tag) => {
    if (tag && tag.indexOf(tagPostfix) >= 0) {
      acc[tag] = params[tag];
    }
    return acc;
  }, {});
  return sortedParams;
}

export function HashFromURL() {
  let hash = window.location.hash;
  hash = hash.replace('#', '');
  const hasharray = hash.split("?");
  hash = hasharray[0];
  return hash;
}