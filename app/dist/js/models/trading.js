export class Trading {
    constructor(_date, quantity, value) {
        this._date = _date;
        this.quantity = quantity;
        this.value = value;
    }
    static createTrading(dateString, quantityString, valueString) {
        const exp = /-/g;
        const date = new Date(dateString.replace(exp, ','));
        const quantity = parseInt(quantityString);
        const value = parseFloat(valueString);
        return new Trading(date, quantity, value);
    }
    toString() {
        return `
      Data: ${this._date},
      Quantidade: ${this.quantity},
      Valor: ${this.value},
    `;
    }
    equals(trading) {
        return this._date.getDate() === trading.date.getDate()
            && this._date.getMonth() === trading.date.getMonth()
            && this._date.getFullYear() === trading.date.getFullYear();
    }
    get date() {
        const date = new Date(this._date.getTime());
        return date;
    }
    get volume() {
        return this.quantity * this.value;
    }
}
//# sourceMappingURL=trading.js.map