/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, Input, ViewChild, ElementRef, asNativeElements } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { applicantService } from '../services/applicant.service';
import { Applicant } from '../shared/models/applicant';
import { ToastComponent } from '../shared/toast/toast.component';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user.model';
import { Renderer2 } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.scss','./applicant.css']
})
export class ApplicantComponent implements OnInit {
    @ViewChild('modalForm') modal!: ElementRef;
    @ViewChild('applicantModal') applicantModal!: ElementRef;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

    displayedColumns = ['Date', 'Name', 'Id', 'Phone', 'Email', 'Status','Actions'];
    public dataSource = new MatTableDataSource<Element>();


    id_selected_apl = '';

    crt_user = new User();
    users: User[] = [];

    applicant = new Applicant();
    applicants: Applicant[] = [];
    isLoading = true;
    isEditing = false;

    applicant_id = new FormControl('');
    stage= new FormControl('');
    pr_date= new FormControl('');
    responsible= new FormControl('');
    pr_status= new FormControl('');
    comments= new FormControl('');

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

    processForm = this.FormBuilder.group({
      stage: this.stage,
      date: this.pr_date,
      responsible: this.responsible,
      status: this.pr_status,
      comments: this.comments,
    });

    applicantForm = this.FormBuilder.group({
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
    this.getApplicantProcess();
    this.getInterviews();

  }

  getInterviews(){
    this.applicantService.getProcess().subscribe(
        (res) => {
          console.log(res);
        }
    );
    this.dataSource.paginator = this.paginator;
  }

  openModal(): void{
    const aplMod = this.applicantModal.nativeElement;
    this.render.setStyle(aplMod,'display','block');
  }

  closeModal(): void{
    const aplMod = this.applicantModal.nativeElement;
    this.render.setStyle(aplMod,'display','none');
  }

  set_id_selected_apl(id: any): void{
    this.id_selected_apl = id;
    console.log(this.id_selected_apl);
    console.log(id);
  }

  addProcess(applicant_id: any): void{
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
    // const mod = this.modal.nativeElement;
    // this.render.setStyle(mod,'display','hidden');

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

  updateUser(user_id: any, apl_id: any): void{
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
      data => this.dataSource = new MatTableDataSource(data),
      error => console.log(error),
      () => this.isLoading = false
    );
    this.dataSource.paginator = this.paginator;
  }

  getUsers(): void{
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  getApplicantProcess(): void{
    this.applicantService.getApplicantProcess(10).subscribe(
      data => console.log(data),
    );
  }

  setApplicantId(id: number){
    this.applicantService.applicantId = id;
  }

}
