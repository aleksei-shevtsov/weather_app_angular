import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/User';
 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private cudOptions: Object = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
  private url = '/api/users'

  public getUsers(): Observable<any> {
    return this.http.get(this.url)
  }

  public createUser(user: User): Observable<any> {
    return this.http.post(this.url, user, this.cudOptions)
  }

  public editUser(user: User): Observable<any> {
    return this.http.put(this.url, user, this.cudOptions)
  }

  public deleteUser(id: number): Observable<any> {
    return this.http.delete<User>(this.url + '/' + id)
  }

}
