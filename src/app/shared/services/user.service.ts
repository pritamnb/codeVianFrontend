import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { ApiEndPoints } from '../../app.constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private router: Router,
    private httpService: HttpService
  ) { }
  onLogin(payload) {
    return this.httpService.post(ApiEndPoints.USER.LOGIN, payload);
  }
  onRegister(payload) {
    console.log(payload);
    return this.httpService.post(ApiEndPoints.USER.REGISTER, payload);
  }
  getMyInfo() {
    return this.httpService.get(ApiEndPoints.USER.ME);
  }
  logout() {
    // this.mainService.setLoginStatus(false);
    window.localStorage.clear();

    // this.router.navigate(['home']);
  }

}
