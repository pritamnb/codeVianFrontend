import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { Subscription } from 'rxjs';
import { AppComponent } from '../app.component';
import { MainService } from '../shared/services/main.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  me: any;
  MyInfoSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private mainService: MainService
  ) {
  }

  ngOnInit() {
    const token = window.localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      this.mainService.setLoginStatus(false);

    } else if (token) {
      this.MyInfoSubscription = this.userService.getMyInfo().subscribe((res) => {
        this.me = res;
        if (res) {
          this.mainService.setLoginStatus(true);

        }
      }, err => {

      });
    }
  }
  ngOnDestroy() {
    if (this.MyInfoSubscription) {
      this.MyInfoSubscription.unsubscribe();
    }
  }
}
