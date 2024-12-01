import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'http://localhost:3002/api/v1';
@Injectable({
  providedIn: 'root'
})
export class DetalleComandaService {

  constructor(private _http: HttpClient) { }

  getDetalleComandasByComanda(id: string) {
    return this._http.get(`${API}/detalle-comanda/comanda/${id}`);
  }

  newDetalleComanda(body: any) {
    return this._http.post(`${API}/detalle-comanda`, body);
  }


}
