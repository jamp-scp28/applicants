import { AfterViewChecked, ChangeDetectorRef, Component, DoCheck, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {

  @ViewChild(MatSidenav)
  sidenav: MatSidenav;

  constructor(public auth: AuthService,
              private changeDetector: ChangeDetectorRef,
              private observer: BreakpointObserver) { }

  // This fixes: https://github.com/DavideViolante/Angular-Full-Stack/issues/105
  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
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
