import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const API = 'http://localhost:3002/api/v1';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  login(body:any){
    return this._http.post(`${API}/usuarios/login`, body);
  }
  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
  logout() {
    localStorage.removeItem('user');
  }


}
