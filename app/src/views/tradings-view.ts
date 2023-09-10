import { escape } from "../decorators/escape.js";
import { Trading } from "../models/trading.js";
import { Tradings } from "../models/tradings.js";
import { View } from "./view.js";

export class TradingsView extends View<Tradings> {
  @escape
  protected template(model: Tradings): string {
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

  private populateList(model: Tradings): string {
    return model.getAll()
                .map(trading => this.createItem(trading))
                .join('');
  }

  private createItem(trading: Trading): string {
    return `
              <tr>
                <td>${this.formatDate(trading)}</td>
                <td>${trading.quantity}</td>
                <td>${trading.value}</td>
              </tr>
            `;
  }

  private formatDate(trading: Trading): string {
    return new Intl.DateTimeFormat().format(trading.date);
  }
}