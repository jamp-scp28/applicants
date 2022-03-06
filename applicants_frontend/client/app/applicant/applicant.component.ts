/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, Input, ViewChild, ElementRef, asNativeElements } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { applicantService } from '../services/applicant.service';
import { Applicant } from '../shared/models/applicant';
import { ToastComponent } from '../shared/toast/toast.component';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';
import { Renderer2 } from '@angular/core';
@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.scss']
})
export class ApplicantComponent implements OnInit {
    @ViewChild('modalForm') modal: ElementRef;

    id_selected_apl: string;

    crt_user = new User();
    users: User[] = [];

    applicant = new Applicant();
    applicants: Applicant[] = [];
    isLoading = true;
    isEditing = false;

    processForm: FormGroup;
    applicant_id = new FormControl('');
    stage= new FormControl('');
    pr_date= new FormControl('');
    responsible= new FormControl('');
    pr_status= new FormControl('');
    comments= new FormControl('');

    applicantForm: FormGroup;
    date = new FormControl('', Validators.required);
    name= new FormControl('', Validators.required);
    nationalId= new FormControl('', );
    phone= new FormControl('', );
    email= new FormControl('', );
    city= new FormControl('', );
    status= new FormControl('', );
    cvLink= new FormControl('',);
    referedBy = new FormControl('',);
    process = new FormControl('');

  constructor(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    private applicantService: applicantService,
    // eslint-disable-next-line @typescript-eslint/no-shadow
    private FormBuilder: FormBuilder,
    private userService: UserService,
    public toast: ToastComponent,
    private render: Renderer2) { }

  ngOnInit(): void {
    this.getApplicants();
    this.getUsers();

    this.processForm = this.FormBuilder.group({
      applicant: this.applicant_id,
      stage: this.stage,
      date: this.pr_date,
      responsible: this.responsible,
      status: this.pr_status,
      comments: this.comments,
    });

    this.applicantForm = this.FormBuilder.group({
      date: this.date,
      name: this.name,
      nationalId: this.nationalId,
      phone: this.phone,
      email: this.email,
      city: this.city,
      status: this.status,
      cvLink: this.cvLink,
      referedBy: this.referedBy,
    });
  }

  set_id_selected_apl(id): void{
    this.id_selected_apl = id;
    console.log(this.id_selected_apl);
    console.log(id);
  }

  addProcess(applicant_id): void{
    const apl = this.applicant;
    const aplId = applicant_id;

    // console.log(apl)
    // apl.process.push(this.processForm.value)
    this.applicantService.addProcess(this.processForm.value,aplId).subscribe(
      res =>{
        this.processForm.reset();
        this.toast.setMessage('Added','sucess');
        this.id_selected_apl = '';
      }
    );
    // this.applicantService.editApplicant2(apl, this.processForm.value).subscribe(
    //   res => {
    //     // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    //     this.processForm.reset(),
    //     this.toast.setMessage('update succesfully', 'success');
    //     this.id_selected_apl = '';
    //   }
    // );
  }

  addApplicant(): void{
    const mod = this.modal.nativeElement;
    this.render.setStyle(mod,'display','hidden');
    console.log('receiving data...');
    console.log(this.applicantForm.value);
    this.applicantService.addApplicant(this.applicantForm.value).subscribe(
      res => {
        this.applicants.push(res);
        this.applicantForm.reset();
        this.toast.setMessage('Added succesfully.','success');
        this.updateUser(res.referedby[0], res._id);
      },
      error => console.log(error)
    );
  }

  updateUser(user_id, apl_id): void{
    const user = this.crt_user;
    user._id = user_id;

    const apl = this.applicant;
    apl.id = apl_id;

    this.userService.editUser2(user,apl).subscribe(
      () => {
        this.toast.setMessage('Success','success');
      }
    );
  }

  getApplicants(): void{
    this.applicantService.getApplicant().subscribe(
      data => this.applicants = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  getUsers(): void{
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

}
