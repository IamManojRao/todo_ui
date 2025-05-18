import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/'; // Replace with your real endpoint

  constructor(private http: HttpClient) {}

  // Example GET request to fetch user data
 getUser(email: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}users/email/${email}`, {
      observe: 'response'
    });
  }

  addUser(email: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}users`, 
      {
        "email": email
      }, {
      observe: 'response'
    });
  }

}
