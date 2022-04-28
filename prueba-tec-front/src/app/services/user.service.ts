import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const USER_URL = "http://localhost:3000/";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(`${USER_URL}usuarios/`);
  }

  getUserId(id){
    return this.http.get(`${USER_URL}usuarios/${id}`);
  }

  getIdentificationType(){
    return this.http.get(`${USER_URL}identifications/`);
  }

  getCities(){
    return this.http.get(`${USER_URL}cities/`);
  }

  saveUser(user){
    return this.http.post(`${USER_URL}usuarios/`, user);
  }

  loginUser(user){
    return this.http.post(`${USER_URL}login/`, user);
  }

  updateUser(user, id){
    return this.http.put(`${USER_URL}usuarios/${id}`, user);
  }

  deleteUser(id){
    return this.http.delete(`${USER_URL}usuarios/${id}`);
  }
}
