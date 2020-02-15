import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as socket_io from 'socket.io-client';

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
  users: any;
  // sockets
  socketEndPoint: 'http://localhost:9697';
  socket: any;
  socketId: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private mainService: MainService
  ) {
    this.users = [{
      id: 1,
      name: 'Pritam',
      email: 'pritam@gmail.com'
    },
    {
      id: 2,
      name: 'Aditya',
      email: 'adity@gmail.com'
    },
    {
      id: 3,
      name: 'Batya',
      email: 'batya@gmail.com'
    },
    {
      id: 4,
      name: 'Ambar',
      email: 'ambar@gmail.com'
    },
    ];

  }

  ngOnInit() {
    this.socket = socket_io('http://localhost:9697');

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

    // socket test

    this.socketId = this.socket.socketId;
    this.socket.on('new_message', (message) => {
      // this.messages.push(message);
      console.log('received msg', message);
    });
    this.socket.on('connected', async (data) => {
      this.socketId = data.clientId;
      console.log('issuing connection', data);
    });
  }
  sendMessage = () => {
    console.log('calling socket for test')
    this.socket.emit('send_message', 'Trying to communicate');
  }
  onUserSelect(id) {
    console.log(id);
  }
  ngOnDestroy() {
    if (this.MyInfoSubscription) {
      this.MyInfoSubscription.unsubscribe();
    }
  }
}
