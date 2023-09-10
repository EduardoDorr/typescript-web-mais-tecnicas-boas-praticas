import { Comparable } from "./comparable.js";
import { Printable } from "./printable.js";

export interface Object<T> extends Printable, Comparable<T> { }