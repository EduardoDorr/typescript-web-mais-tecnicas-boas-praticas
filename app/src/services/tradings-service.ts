import { TradingsImport } from "../interfaces/tradings-import.js";
import { Trading } from "../models/trading.js";

export class TradingsService {
  public async getTradings(): Promise<Trading[]> {
    return fetch('http://localhost:8080/dados')
      .then(res => res.json())
      .then((dataList: TradingsImport[]) => {
        return dataList.map(data => {
          return new Trading(
            new Date(),
            data.vezes,
            data.montante
          )
        })
      });
  }
}