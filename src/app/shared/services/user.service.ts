import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(
    private router: Router
  ) { }
  logout() {
    // this.mainService.setLoginStatus(false);
    window.localStorage.clear();

    // this.router.navigate(['home']);
  }
}
