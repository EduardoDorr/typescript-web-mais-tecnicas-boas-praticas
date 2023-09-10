import { Object } from "../interfaces/object.js";

export class Trading implements Object<Trading> {
  constructor(
    private _date: Date,
    public readonly quantity: number,
    public readonly value: number) { }

  public static createTrading(dateString: string, quantityString: string, valueString: string): Trading {
    const exp = /-/g;
    const date = new Date(dateString.replace(exp, ','));
    const quantity = parseInt(quantityString);
    const value = parseFloat(valueString);

    return new Trading(date, quantity, value);
  }

  public toString(): string {
    return `
      Data: ${this._date},
      Quantidade: ${this.quantity},
      Valor: ${this.value},
    `;
  }

  public equals(trading: Trading): boolean{
    return this._date.getDate() === trading.date.getDate()
        && this._date.getMonth() === trading.date.getMonth()
        && this._date.getFullYear() === trading.date.getFullYear()
  }

  get date(): Date {
    const date = new Date(this._date.getTime());
    return date;
  }

  get volume(): number {
    return this.quantity * this.value;
  }
}