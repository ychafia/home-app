import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, group } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('slide-app', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  showMe: boolean = false;
  public errorText: string;
  postData = {username: '', password: ''};
  
  
  constructor(public authService: AuthService, public router: Router) { 
    this.errorText = "";
  }

  open() {
    this.showMe = true;
  }

  loginAction() {
    if(this.postData.username && this.postData.password){
      this.errorText = "";
      this.authService.login(this.postData)
      .subscribe(data => {
        if(data) {
          this.router.navigate(['mescourses']);
        }
      },
      error => {
        if(error && error.status == 500) {
          this.errorText = "login/password incorrect !";
        } else if (error && error.status == 401) {
          this.errorText = "login/password incorrect !";
        }
        console.log(error);
      });
    } else {
      this.errorText = "login/password incorrect !";
    }
  }

  ngOnInit() {
  }

}
