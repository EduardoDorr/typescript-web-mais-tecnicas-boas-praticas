import { Printable } from "../interfaces/printable.js";

export function toConsole(...objs: Printable[]) {
  for (let obj of objs) {
    console.log(obj.toString());
  }
}