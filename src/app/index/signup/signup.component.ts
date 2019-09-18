import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public errorText: string;
  postData = {username: '', password: '', password2: ''};

  constructor(public authService: AuthService, public router: Router) { }

  registerAction() {
    this.errorText = "";
    if(this.postData.username && this.postData.password && this.postData.password2) {
      if(this.postData.password == this.postData.password2){
        this.authService.register(this.postData)
        .subscribe(data => {
          if(data) {
            this.router.navigate(['login']);
          }
        },
        error => {
          this.errorText = "Error to register the new user <br> Please contact admin";
          console.log(error);
        });
      } else {
        this.errorText = "Les mots de passe sont différents !!";
        this.postData.password = '';
        this.postData.password2 = '';
      }
    }
      
  }

  ngOnInit() {
  }

}
