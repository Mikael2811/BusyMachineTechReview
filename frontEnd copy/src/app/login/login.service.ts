import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders, HttpHeaderResponse} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';
import {User} from '../user';
 
@Injectable({ 
  providedIn: 'root' 
}) 
export class loginService { 
 
 
  private REST_API_SERVER = "http://localhost:8000/api"; 

  

  constructor(
      private httpClient: HttpClient
    ) { } 


  logIn(email:string, password:string): Observable<User[]> {
    return this.httpClient.post<any>(this.REST_API_SERVER + '/login',{email: email, password:password});
  }

  getloggedUserId(email:string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.httpClient.get(this.REST_API_SERVER + '/userId')
  }

  signUp(data:any) {
    return this.httpClient.post<any>(this.REST_API_SERVER + '/signUp', {data:data});
  }


}