import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private cudOptions: Object = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private url = '/api/users'

  public getUsers(): Observable<User[]> {
    return this.http.get(this.url).pipe(map(data => data as User[]))
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

  public getUserById(id: number): Observable<User> {
    return this.http.get(this.url, {
      params: new HttpParams()
        .append('id', id)
    })
      .pipe(map((data: any) => {
        
        return console.log('this is data[0]',data[0]), data[0] as User || null}))
        
  }

}
