export abstract class View<T> {
  protected _element: HTMLElement

  constructor(selector: string) {
    const element = document.querySelector(selector);

    if (element) {
      this._element = element as HTMLElement;
    }
    else {
      throw new Error(`O seletor ${selector} não existe no DOM.`);
    }
  }

  protected abstract template(model: T): string;

  public update(model: T): void {
    let template = this.template(model);
    this._element.innerHTML = template;
  }
}