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
    @ViewChild("modalForm") modal: ElementRef;

    id_selected_apl: String;

    crt_user = new User();
    users: User[] = [];

    applicant = new Applicant();
    applicants: Applicant[] = [];
    isLoading = true;
    isEditing = false;

    processForm: FormGroup;
    stage= new FormControl('');
    pr_date= new FormControl('');
    responsible= new FormControl('');
    state= new FormControl('');
    comments= new FormControl('');

    applicantForm: FormGroup;
    date = new FormControl('', Validators.required);
    apl_name= new FormControl('', Validators.required);
    apl_id= new FormControl('', );
    apl_phone= new FormControl('', );
    apl_email= new FormControl('', );
    apl_city= new FormControl('', );
    apl_state= new FormControl('', );
    cv_link= new FormControl('',);
    referedby = new FormControl('',);
    process = new FormControl('');

  constructor(private applicantService: applicantService,
    private FormBuilder: FormBuilder,
    private userService: UserService, 
    public toast: ToastComponent,
    private render: Renderer2) { }

  ngOnInit(): void {
    this.getApplicants();
    this.getUsers();

    this.processForm = this.FormBuilder.group({
      stage: this.stage,
      pr_date: this.pr_date,
      responsible: this.responsible,
      state: this.state,
      comments: this.comments,
    }); 

    this.applicantForm = this.FormBuilder.group({
      date: this.date,
      apl_name: this.apl_name,
      apl_id: this.apl_id,
      apl_phone: this.apl_phone,
      apl_email: this.apl_email,
      apl_city: this.apl_city,
      apl_state: this.apl_state,
      cv_link: this.cv_link,
      referedby: this.referedby,
    })
  }

  set_id_selected_apl(id): void{
    this.id_selected_apl = id;
    console.log(this.id_selected_apl)
    console.log(id)
  }

  addProcess(applicant_id): void{
    console.log(this.processForm.value);
    console.log(applicant_id);
    const apl = this.applicant;
    apl._id = applicant_id;

    // console.log(apl)
    // apl.process.push(this.processForm.value)

    this.applicantService.editApplicant2(apl, this.processForm.value).subscribe(
      res => {
        this.processForm.reset(),
        this.toast.setMessage("update succesfully", 'success');
        this.id_selected_apl = "";
      }
    )
  }

  addApplicant(): void{
    let mod = this.modal.nativeElement;
    this.render.setStyle(mod,"display","hidden");
    console.log("receiving data...");
    console.log(this.applicantForm.value);
    // this.applicantService.addApplicant(this.applicantForm.value).subscribe(
    //   res => {
    //     this.applicants.push(res);
    //     this.applicantForm.reset();
    //     this.toast.setMessage("Added succesfully.","success");
    //     this.updateUser(res.referedby[0], res._id);
    //   },
    //   error => console.log(error)
    // );
  }

  updateUser(user_id, apl_id): void{
    const user = this.crt_user;
    user._id = user_id;

    const apl = this.applicant
    apl._id = apl_id 

    this.userService.editUser2(user,apl).subscribe(
      () => {
        this.toast.setMessage("Success","success")
      }
    )
  }

  getApplicants(): void{
    this.applicantService.getApplicant().subscribe(
      data => this.applicants = data,
      error => console.log(error),
      () => this.isLoading = false,
    )
  }

  getUsers(): void{
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.log(error),
      () => this.isLoading = false,
    )
  }

}
