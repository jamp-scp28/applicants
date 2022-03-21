import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../shared/models/user.model';



@Injectable()
export class UserService {
  baseUrl = 'http://localhost:8080';
  httpOptions;

  constructor(private http: HttpClient,
    ) {
    const token = localStorage.getItem('token');
     this.httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: 'Bearer '+token
      })
    };
    }


  register(user: any): Observable<any> {
    console.log(user);
    const formData = new FormData();
    formData.append('username',user.username);
    formData.append('password',user.password);
    //formData.append('roles',user.roles);

    return this.http.post(`${this.baseUrl}/api/user/save`, user,this.httpOptions);
  }

  login(credentials: any): Observable<any> {
    console.log('logging...');
    console.log(credentials);
    const formData = new FormData();
    formData.append('username',credentials.username);
    formData.append('password',credentials.password);


    return this.http.post(`${this.baseUrl}/login`, formData);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/users`,this.httpOptions);
  }

  countUsers(): Observable<number> {
    return this.http.get<number>('/api/users/count');
  }

  addUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/user`, user,this.httpOptions);
  }

  getUser(user: User): Observable<User> {
    return this.http.get<User>(`/api/user/${user._id}`);
  }

  editUser(user: User): Observable<any> {
    return this.http.put(`/api/user/${user._id}`, user, { responseType: 'text' });
  }

  editUser2(user: User, data: any): Observable<any> {
    return this.http.put(`/api/user/v2/${user._id}`, data, { responseType: 'text' });
  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete(`/api/user/${user._id}`, { responseType: 'text' });
  }

}
