import { Component, OnInit } from '@angular/core';
import { applicantService } from '../services/applicant.service';
import { Applicant } from '../shared/models/applicant';
import { Process } from '../shared/models/process';

@Component({
  selector: 'app-applicant-page',
  templateUrl: './applicant-page.component.html',
  styleUrls: ['./applicant-page.component.scss','./applicant-page.css']
})
export class ApplicantPageComponent implements OnInit {
  applicants: Applicant[] = [];
  process: Process[] = [];
  applicantId!: number;
  currentApplicant!: Applicant;

  constructor(
    private applicantsService: applicantService,
  ) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.applicantId = this.applicantsService.applicantId;
    this.getApplicants();
    this.getApplicantProcess();
    ;
  }

  getApplicants(): void{
    this.applicantsService.getApplicant().subscribe(
      data => {
        this.applicants = data;
        console.log(this.applicants);
        console.log(this.applicantId);
        const results = this.applicants.filter(x=> x.id?.toString() === this.applicantId.toString());
        this.currentApplicant = results[0];
      },
      error => console.log(error)
    );
  }

  getApplicantProcess(): void{
    console.log(this.applicantId);
    this.applicantsService.getApplicantProcess(this.applicantId).subscribe(
      data => {
        this.process = data;
      },
      error => console.log(error),
    );
    console.log(this.process);
  }
}
