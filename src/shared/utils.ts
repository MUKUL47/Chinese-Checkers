import { Subject } from "rxjs";
export default class Utils {
  static Toast = new Subject<string>();
  static sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }
  static beautifyCamelCase(val: string) {
    return val
      .split(/-|_| /)
      .filter(String)
      .map((v) => `${v[0].toUpperCase()}${v.slice(1)}`)
      .join(" ");
  }
  static getCookie(name: string) {
    return document.cookie.split(`${name}=`)[1]?.split(";")?.[0]?.trim() || "";
  }
}
