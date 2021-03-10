import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders, HttpHeaderResponse} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';
 
@Injectable({ 
  providedIn: 'root' 
}) 
export class ordersService { 
 
 
  private REST_API_SERVER = "http://localhost:8000/api"; 
  private token = localStorage.getItem("token");
  

  constructor(
      private httpClient: HttpClient
    ) { } 

  getUserOrders(userId:any): Observable<any> {
    return this.httpClient.post<any>(this.REST_API_SERVER + '/userOrders', {userID:userId})
  }
}