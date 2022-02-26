import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { applicantService } from '../services/applicant.service';
import { ToastComponent } from '../shared/toast/toast.component';

import { ApplicantComponent } from './applicant.component';

class ApplicantServiceMock { }

describe('ApplicantComponent', () => {
  let component: ApplicantComponent;
  let fixture: ComponentFixture<ApplicantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantComponent ],
      providers: [
        ToastComponent, FormBuilder,
        { provide: applicantService, useClass: ApplicantServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
