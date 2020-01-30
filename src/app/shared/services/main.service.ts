import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  isLogin = new BehaviorSubject<boolean>(false);
  isLogin$ = this.isLogin.asObservable();
  constructor() { }

  setLoginStatus(isLogin: boolean) {
    this.isLogin.next(isLogin);
  }
}
