import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, observable } from "rxjs";

import { Applicant } from "../shared/models/applicant";
@Injectable()
export class applicantService{

    constructor(private http: HttpClient){};
    
    getApplicant(): Observable<Applicant[]>{
        return this.http.get<Applicant[]>('api/applicants');
    }

    get_process(): Observable<any[]>{
        return this.http.get<any[]>('api/applicants_dt')
    }

    addApplicant(applicant:Applicant): Observable<Applicant>{
        return this.http.post<Applicant>('api/applicant',applicant);
    }

    editApplicant(applicant: Applicant): Observable<any>{
        return this.http.put(`/api/applicant/${applicant._id}`, applicant, { responseType: 'text' });
    }

    editApplicant2(applicant: Applicant, data): Observable<any>{
        return this.http.put(`/api/applicant/v2/${applicant._id}`, data, { responseType: 'text' });
    }
}