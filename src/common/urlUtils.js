export function getQueryParams(searchString = "") {
  return searchString
    .slice(1)
    .split("&")
    .map((p) => p.split("="))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
}
