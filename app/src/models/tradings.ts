import { Trading } from "./trading.js";
import { Object } from "../interfaces/object.js";

export class Tradings implements Object<Tradings> {
  private _tradings: Trading[] = [];

  public add(trading: Trading): void {
    this._tradings.push(trading);
  }

  public getAll(): readonly Trading[] {
    return this._tradings;
  }

  public toString(): string {
    return JSON.stringify(this.getAll(), null, 2);
  }

  public equals(tradings: Tradings): boolean {
    return JSON.stringify(this._tradings) === JSON.stringify(tradings);
  }
}