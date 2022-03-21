import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

import { Applicant } from '../shared/models/applicant';
@Injectable()
// eslint-disable-next-line @typescript-eslint/naming-convention
export class applicantService{
    baseUrl = 'http://localhost:8080';
    httpOptions: any;
    httpOptionsPr: any;
    constructor(private http: HttpClient){
        const token = localStorage.getItem('token');
        this.httpOptions = {
            headers: new HttpHeaders({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: 'Bearer '+ token,
        })
        };
        this.httpOptionsPr = {
            responseType: 'text',
            headers: new HttpHeaders({
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: 'Bearer '+ token,
        })
        };
    };

    getApplicant(): Observable<any>{
        return this.http.get(`${this.baseUrl}/api/applicants`,this.httpOptions);
    }

    addApplicant(applicant: Applicant): Observable<any>{
        return this.http.post(`${this.baseUrl}/api/applicant/add`,applicant,this.httpOptions);
    }

    editApplicant(applicant: Applicant): Observable<any>{
        return this.http.put(`/api/applicant/${applicant.id}`, applicant, { responseType: 'text' });
    }

    editApplicant2(applicant: Applicant, data: any): Observable<any>{
        return this.http.put(`/api/applicant/v2/${applicant.id}`, data, { responseType: 'text' });
    }


    getProcess(): Observable<any>{
        return this.http.get(`${this.baseUrl}/api/process`,this.httpOptions);
    }

    getApplicantProcess(aplId: number): Observable<any>{
        return this.http.get(`${this.baseUrl}/api/applicants/${aplId}/process/`,this.httpOptionsPr);
    }

    addProcess(process: any, aplId: number): Observable <any>{
        console.log(process);
        return this.http.post(`${this.baseUrl}/api/applicants/${aplId}/process/add/`,process,this.httpOptionsPr);
    }

}
