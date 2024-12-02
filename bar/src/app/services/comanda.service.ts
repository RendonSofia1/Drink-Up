import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
const API = 'http://localhost:3002/api/v1';

@Injectable({
  providedIn: 'root'
})
export class ComandaService {

  constructor(private _http: HttpClient) { }

  comandaActualizada = new EventEmitter<void>();

  getComandas(){
    return this._http.get(`${API}/comanda`);
  }

  getComandasByMesa (id: number) {
    return this._http.get(`${API}/comanda/mesa/${id}`);
  }

  getComandasByStatus (status: number) {
    return this._http.get(`${API}/comanda/estatus/${status}`);
  }

  getComandasByUser (idUser: number, status: number) {
    return this._http.get(`${API}/comanda/user/${idUser}/estatus/${status}`);
  }

  newComanda(body:any){
    return this._http.post(`${API}/comanda`, body);
  }

  deleteComanda(id:number){
    return this._http.delete(`${API}/comanda/${id}`);
  }

  updateComanda(body:any, id:number){
    const request = this._http.patch(`${API}/comanda/${id}`, body);
    request.subscribe(() => this.comandaActualizada.emit());
    return request;
  }


}
