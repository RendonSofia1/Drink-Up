import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const API = 'http://localhost:3002/api/v1';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }

  login(body: any) {
    return this._http.post(`${API}/usuarios/login`, body);
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  getMesaUser() {
    return JSON.parse(localStorage.getItem('mesaUser') || '{}');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  isMesaLoggedIn(): boolean {
    return !!localStorage.getItem('mesaUser');
  }

  logout() {
    localStorage.removeItem('user');
  }

  logoutMesaUser() {
    localStorage.removeItem('mesaUser');
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  setMesaUser(mesaUser: any) {
    localStorage.setItem('mesaUser', JSON.stringify(mesaUser));
  }
}
