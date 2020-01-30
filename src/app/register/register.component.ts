import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { MainService } from '../shared/services/main.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  registrationSubscription: Subscription;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private mainService: MainService

  ) { }

  ngOnInit() {
    const token = window.localStorage.getItem('token');
    if (!token) {
      this.mainService.setLoginStatus(false);
      this.router.navigate(['/register']);
    } else if (token) {
      this.mainService.setLoginStatus(true);
      this.router.navigate(['/home']);
    }

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    const payload = {
      name: this.registerForm.value.firstName + this.registerForm.value.lastName,
      email: this.registerForm.value.username,
      password: this.registerForm.value.password
    };

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // api call
    this.registrationSubscription = this.userService.onRegister(payload).subscribe((res) => {
      if (res) {
        this.router.navigate(['/login']);
      }
    }, err => {

      console.log('error', err);
    });
  }
  ngOnDestroy(): void {
    if (this.registrationSubscription) {
      this.registrationSubscription.unsubscribe();
    }
  }
}
