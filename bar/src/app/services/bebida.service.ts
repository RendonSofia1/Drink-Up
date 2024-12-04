import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const API = 'http://localhost:3002/api/v1';

@Injectable({
  providedIn: 'root'
})
export class BebidaService {
  getNewDrink: EventEmitter<any> = new EventEmitter();

  constructor(private _http: HttpClient) { }

  getBebidas(){
    return this._http.get(`${API}/bebidas`);
  }

  getBebidasByNombre(nombre:string){
    return this._http.get(`${API}/bebidas/search/${nombre}`);
  }

  newBebida(body:any){
    return this._http.post(`${API}/bebidas`, body);
  }

  setNewBebida(object: any) {
    this.getNewDrink.emit({ action: 'add', object });
  }

  setBebidaEliminado(id: number) {
    this.getNewDrink.emit({ action: 'delete', id });
  }

  deleteBebida(id:number){
    return this._http.delete(`${API}/bebidas/${id}`);
  }

  updateBebida(body:any, id:number){
    return this._http.patch(`${API}/bebidas/${id}`, body);
  }
}
