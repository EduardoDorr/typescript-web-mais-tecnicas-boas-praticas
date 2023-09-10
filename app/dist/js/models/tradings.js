export class Tradings {
    constructor() {
        this._tradings = [];
    }
    add(trading) {
        this._tradings.push(trading);
    }
    getAll() {
        return this._tradings;
    }
    toString() {
        return JSON.stringify(this.getAll(), null, 2);
    }
    equals(tradings) {
        return JSON.stringify(this._tradings) === JSON.stringify(tradings);
    }
}
//# sourceMappingURL=tradings.js.map