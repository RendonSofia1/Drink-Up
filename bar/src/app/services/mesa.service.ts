import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
const API = 'http://localhost:3002/api/v1';

@Injectable({
  providedIn: 'root'
})
export class MesaService {
  getNewMesa: EventEmitter<any> = new EventEmitter();

  constructor(private _http: HttpClient) { }

  getMesas(){
    return this._http.get(`${API}/mesas`);
  }

  newMesa(body:any){
    return this._http.post(`${API}/mesas`, body);
  }

  updateMesa(id:any, body:any){
    return this._http.patch(`${API}/mesas/${id}`, body);
  }

  deleteMesa(id:any){
    return this._http.delete(`${API}/mesas/${id}`);
  }

  emitNewMesa(object: any) {
    this.getNewMesa.emit({ action: 'add', object });
  }

  emitMesaEliminado(id: number) {
    this.getNewMesa.emit({ action: 'delete', id });
  }

}
