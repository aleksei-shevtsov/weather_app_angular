import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/User';
 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private cudOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
  private url = '/api/users'


  // “/app/users/?name=lis”

  getUsers(): Observable<any> {
    return this.http.get(this.url);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(this.url, user, this.cudOptions)
  }

  editUser(user: any): Observable<any> {
    return this.http.put(this.url, user, this.cudOptions)
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<User>(this.url + '/' + id);
  }

}
