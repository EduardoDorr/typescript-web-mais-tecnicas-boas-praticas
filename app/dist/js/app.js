import { TradingController } from "./controllers/trading-controller.js";
const controller = new TradingController();
const form = document.querySelector('.form');
if (form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
        controller.addTrading();
    });
}
else {
    throw new Error("Não foi possível iniciar a aplicação. Por favor, verifique o elemento form.");
}
const importButton = document.querySelector('#botao-importar');
if (importButton) {
    importButton.addEventListener('click', () => {
        controller.importTodaysData();
    });
}
else {
    throw new Error("Não foi possível iniciar a aplicação. Por favor, verifique o id botao-importar.");
}
//# sourceMappingURL=app.js.map