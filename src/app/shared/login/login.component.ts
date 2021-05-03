import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { User } from './user.model';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user = new User();
  
  constructor(public router: Router,
              private authService : AuthService) {

   }

  ngOnInit(): void {
  }

  LoginUser(){
  console.log(this.user);
  let isValidUser: Boolean = this.authService.logIn(this.user);
  console.log("valid user "+isValidUser);
  if (isValidUser)
  {
    console.log("isadmin "+this.authService.isAdmin());
    this.router.navigate(['/home']);     
  }
    else
    console.log('Non connecté','Login ou mot de passe incorrecte!','error');
}


}
