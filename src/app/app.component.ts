import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from './shared/services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentUser: boolean = false;
  constructor(
    private router: Router,
    private mainService: MainService
  ) {
    this.mainService.isLogin$.subscribe(status => {
      this.currentUser = status;
    }
    );
  }
  ngOnInit() {
    const token = window.localStorage.getItem('token');
    if (!token) {
      this.currentUser = false;
      this.mainService.setLoginStatus(false);
      this.router.navigate(['/login']);
    } else if (token) {
      this.currentUser = true;
      this.mainService.setLoginStatus(true);
      this.router.navigate(['/home']);
    }
  }
  logout() {
    this.currentUser = false;
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }
}
