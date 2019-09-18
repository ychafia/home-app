import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public errorText: string;
  postData = {username: '', password: ''};
  
  
  constructor(public authService: AuthService, public router: Router) { 
    this.errorText = "";
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
        if(error && error.status == 401) {
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
