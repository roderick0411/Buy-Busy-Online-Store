export function displayPrice(price) {
  let p = String(price);
  if (p.length <= 3) {
    return p;
  }
  let res = p.substring(p.length - 3);
  let index = p.length - 5;
  for (index; index >= 1; index -= 2) {
    res = p.substring(index, index + 2) + "," + res;
  }
  return index === 0
    ? p.substring(0, 2) + "," + res
    : p.substring(0, 1) + "," + res;
}

export function trimString(str) {
  if (str.length < 40) {
    return str;
  }
  return str.substring(0, 38) + "...";
}

export function getAuthToken() {
  const token = localStorage.getItem("buyBusyToken");
  return token;
}

export function handleAuthFailure() {}
