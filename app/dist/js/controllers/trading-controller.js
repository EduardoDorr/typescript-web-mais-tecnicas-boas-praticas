var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    constructor() {
        this._tradings = new Tradings();
        this._service = new TradingsService();
        this._tradingsView = new TradingsView('#negociacoesView');
        this._messageView = new MessageView('#mensagemView');
        this._tradingsView.update(this._tradings);
    }
    addTrading() {
        const trading = Trading.createTrading(this._inputDate.value, this._inputQuantity.value, this._inputValue.value);
        if (!this.isWeekDay(trading.date)) {
            this._messageView.update("Somente negociações em dias úteis são permitidas!");
            return;
        }
        this._tradings.add(trading);
        toConsole(trading, this._tradings);
        this.updateView();
        this.clearForm();
    }
    importTodaysData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._service
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
        });
    }
    updateView() {
        this._tradingsView.update(this._tradings);
        this._messageView.update("Negociação adicionada com sucesso!");
    }
    isWeekDay(date) {
        return date.getDay() > DayOfWeek.SUNDAY &&
            date.getDay() < DayOfWeek.SATURDAY;
    }
    clearForm() {
        this._inputDate.value = '';
        this._inputQuantity.value = '';
        this._inputValue.value = '';
        this._inputDate.focus();
    }
}
__decorate([
    domInjector('#data')
], TradingController.prototype, "_inputDate", void 0);
__decorate([
    domInjector('#quantidade')
], TradingController.prototype, "_inputQuantity", void 0);
__decorate([
    domInjector('#valor')
], TradingController.prototype, "_inputValue", void 0);
__decorate([
    logExecutionTime(),
    inspect()
], TradingController.prototype, "addTrading", null);
//# sourceMappingURL=trading-controller.js.map