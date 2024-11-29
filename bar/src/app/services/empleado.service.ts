import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
const API = 'http://localhost:3002/api/v1';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  getNewEmployee: EventEmitter<any> = new EventEmitter();

  constructor(private _http: HttpClient) { }

  getEmpleados(){
    return this._http.get(`${API}/usuarios`);
  }

  newEmpleado(body:any){
    return this._http.post(`${API}/usuarios`, body);
  }

  setNewEmpleado(object: any) {
    this.getNewEmployee.emit({ action: 'add', object });
  }

  setEmpleadoEliminado(id: number) {
    this.getNewEmployee.emit({ action: 'delete', id });
  }

  deleteEmpleado(id:number){
    return this._http.delete(`${API}/usuarios/${id}`);
  }

  updateEmpleado(body:any, id:number){
    return this._http.patch(`${API}/usuarios/${id}`, body);
  }
}
