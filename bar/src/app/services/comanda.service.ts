import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
const API = 'http://localhost:3002/api/v1';

@Injectable({
  providedIn: 'root'
})
export class ComandaService {
  getNewComanda: EventEmitter<any> = new EventEmitter();

  constructor(private _http: HttpClient) { }

  getComandas(){
    return this._http.get(`${API}/comandas`);
  }

  newComanda(body:any){
    return this._http.post(`${API}/comandas`, body);
  }

  setNewComanda(object: any) {
    this.getNewComanda.emit({ action: 'add', object });
  }

  setComandaEliminado(id: number) {
    this.getNewComanda.emit({ action: 'delete', id });
  }

  deleteComanda(id:number){
    return this._http.delete(`${API}/comandas/${id}`);
  }

  updateComanda(body:any, id:number){
    return this._http.patch(`${API}/comandas/${id}`, body);
  }
}
