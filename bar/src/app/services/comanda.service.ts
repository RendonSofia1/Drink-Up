import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
const API = 'http://localhost:3002/api/v1';

@Injectable({
  providedIn: 'root'
})
export class ComandaService {

  constructor(private _http: HttpClient) { }

  getComandas(){
    return this._http.get(`${API}/comanda`);
  }

  getComandasByMesa (id: number) {
    return this._http.get(`${API}/comanda/mesa/${id}`);
  }

  getComandasByStatus (status: number) {
    return this._http.get(`${API}/comanda/status/${status}`);
  }

  getComandasByUser (id: number, status: number) {
    return this._http.get(`${API}/comanda/user/${id}/status/${status}`);
  }

  newComanda(body:any){
    return this._http.post(`${API}/comanda`, body);
  }

  deleteComanda(id:number){
    return this._http.delete(`${API}/comanda/${id}`);
  }

  updateComanda(body:any, id:number){
    return this._http.patch(`${API}/comanda/${id}`, body);
  }
}
