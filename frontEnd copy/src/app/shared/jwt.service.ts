import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../user';


@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private REST_API_SERVER = "http://127.0.0.1:8000/api/auth"; 

  constructor(private http: HttpClient) { }
  User!:User;

  logIn(user: User): Observable<any> {
    return this.http.post<any>(this.REST_API_SERVER + '/login', user);
  }

  signUp(user: User): Observable<any> {
    return this.http.post(this.REST_API_SERVER + '/signup', user);
  }

  dashboard():Observable<any> {
    return this.http.get(this.REST_API_SERVER + '/user')
  }

}
