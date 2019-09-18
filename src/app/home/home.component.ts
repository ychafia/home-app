import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  logoutAction() {
    if(this.authService.logout()){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

}
