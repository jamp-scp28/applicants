import { AfterViewChecked, ChangeDetectorRef, Component, DoCheck, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss','./app.css']
})
export class AppComponent implements AfterViewChecked {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  @ViewChild('home') home!: ElementRef;
  @ViewChild('users') users!: ElementRef;
  @ViewChild('applicants') applicants!: ElementRef;

  //SideBar Options
  isSidebarOpen = true;
  isPanelOpen = false;
  isUserOptionsOpen = false;

  constructor(public auth: AuthService,
              private changeDetector: ChangeDetectorRef,
              private observer: BreakpointObserver,
              private render: Renderer2) { }

  // This fixes: https://github.com/DavideViolante/Angular-Full-Stack/issues/105
  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  tooglePanel(){
    this.isPanelOpen = !this.isPanelOpen;
  }

  toogleUserPanel(){
    this.isUserOptionsOpen = !this.isUserOptionsOpen;
  }

  setActiveLink(linkOne: any){
    console.log(linkOne);

    this.render.addClass(linkOne,'active-link');

  }
  // ngDoCheck() {
  //     if(this.sidenav !== undefined && this.sidenav !== null){
  //       this.observer
  //       .observe(['(max-width: 800px)'])
  //       .pipe(delay(1))
  //       .subscribe((res) => {
  //         if (res.matches) {
  //           this.sidenav.mode = 'over';
  //           this.sidenav?.close();
  //         } else {
  //           this.sidenav.mode = 'side';
  //           this.sidenav.open();
  //         }
  //       });
  //     }
  //  }
}
