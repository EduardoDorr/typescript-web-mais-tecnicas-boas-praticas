import { Trading } from "../models/trading.js";
import { Tradings } from "../models/tradings.js";
import { DayOfWeek } from "../enums/day-of-week.js";
import { MessageView } from "../views/message-view.js";
import { TradingsView } from "../views/tradings-view.js";
import { inspect } from "../decorators/inspect.js";
import { domInjector } from "../decorators/dom-injector.js";
import { logExecutionTime } from "../decorators/log-execution-time.js";
import { TradingsService } from "../services/tradings-service.js";
import { toConsole } from "../utils/toConsole.js";

export class TradingController {
  @domInjector('#data')
  private _inputDate: HTMLInputElement;
  @domInjector('#quantidade')
  private _inputQuantity: HTMLInputElement;
  @domInjector('#valor')
  private _inputValue: HTMLInputElement;
  private _tradings = new Tradings();
  private _service = new TradingsService();
  private _tradingsView = new TradingsView('#negociacoesView');
  private _messageView = new MessageView('#mensagemView');

  constructor() {
    this._tradingsView.update(this._tradings);
  }

  @logExecutionTime()
  @inspect()
  public addTrading(): void {
    const trading = Trading.createTrading(this._inputDate.value,
      this._inputQuantity.value,
      this._inputValue.value);

    if (!this.isWeekDay(trading.date)) {
      this._messageView.update("Somente negociações em dias úteis são permitidas!");

      return;
    }

    this._tradings.add(trading);

    toConsole(trading, this._tradings);

    this.updateView();
    this.clearForm();
  }

  public async importTodaysData(): Promise<void> {
    await this._service
      .getTradings()
      .then(tradingsImport => {
        return tradingsImport.filter(tradingImport => {
          return !this._tradings
            .getAll()
            .some(trading => trading.equals(tradingImport));
        });
      })
      .then(tradingsImportFiltered => {
        tradingsImportFiltered.forEach(trading => {
          this._tradings.add(trading);
          this.updateView();
        });
      });
  }

  private updateView() {
    this._tradingsView.update(this._tradings);
    this._messageView.update("Negociação adicionada com sucesso!");
  }

  private isWeekDay(date: Date) {
    return date.getDay() > DayOfWeek.SUNDAY &&
      date.getDay() < DayOfWeek.SATURDAY;
  }

  private clearForm(): void {
    this._inputDate.value = '';
    this._inputQuantity.value = '';
    this._inputValue.value = '';
    this._inputDate.focus();
  }
}