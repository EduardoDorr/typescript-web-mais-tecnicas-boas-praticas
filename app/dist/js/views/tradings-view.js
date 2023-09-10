var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { escape } from "../decorators/escape.js";
import { View } from "./view.js";
export class TradingsView extends View {
    template(model) {
        return `
      <table class="table table-hover table-hovered">
        <thead>
          <tr>
            <th>DATA</th>
            <th>QUANTIDADE</th>
            <th>VALOR</th>
          </tr>
        </thead>
        <tbody>
          ${this.populateList(model)}
        </tbody>
      </table>
    `;
    }
    populateList(model) {
        return model.getAll()
            .map(trading => this.createItem(trading))
            .join('');
    }
    createItem(trading) {
        return `
              <tr>
                <td>${this.formatDate(trading)}</td>
                <td>${trading.quantity}</td>
                <td>${trading.value}</td>
              </tr>
            `;
    }
    formatDate(trading) {
        return new Intl.DateTimeFormat().format(trading.date);
    }
}
__decorate([
    escape
], TradingsView.prototype, "template", null);
//# sourceMappingURL=tradings-view.js.map