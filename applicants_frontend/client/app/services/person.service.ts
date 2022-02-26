// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, observable } from 'rxjs';
// import { Person } from '../shared/models/person';

// @Injectable()
// export class PersonService {

//   constructor(private http: HttpClient) { }

//   getPersons(): Observable<Person[]>{
//     return this.http.get<Person[]>('api/persons');
//   }

//   addPerson(person: Person): Observable<Person>{
//     return this.http.post<Person>('api/person',person);
//   }

//   editPersonMain(person: Person): Observable<any>{
//     return this.http.put(`/api/person/${person._id}`, person, { responseType: 'text' });
//   }

//   editPerson(id, data){
//     return this.http.patch(`/api/person/${id}`, data, { responseType: 'text' });
//   }

//   getPerson(person: Person): Observable<Person> {
//     return this.http.get<Person>(`/api/person/${person._id}`);
//   }

//   getPersonById(id: String): Observable<any>{
//     return this.http.put(`/api/person/${id}`, { responseType: 'text' });
//   }

// }