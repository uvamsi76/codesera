// utils/cookies.ts
import Cookies from 'js-cookie';

// Set a cookie
export function setCookie(key: string, value: string, options: Cookies.CookieAttributes = {}) {
  console.log(key,value)
  Cookies.set(key, value);
}

// Get a cookie
export function getCookie(key: string) {
  console.log(Cookies.get(key))
  return Cookies.get(key);
}

// Delete a cookie
export function removeCookie(key: string) {
  Cookies.remove(key);
}
