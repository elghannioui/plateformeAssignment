import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { isUndefined } from 'util';
import { User } from './login/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: User[] = [{"email":"amine@gmail.com","password":"amine","role":['ADMIN']},
  {"email":"mohammed@gmail.com","password":"mohammed","role":['USER']}];

  public loggedIn: Boolean = false;
  public loggedUser:string;
  public roles:string[];

  constructor(private router: Router) { }

  logIn(user : User):Boolean{

   let validUser: Boolean = false;
    this.users.forEach((ceuser) => {
      if(user.email == ceuser.email && user.password == ceuser.password) {
        validUser = true;
        this.loggedUser = ceuser.email;
        this.loggedIn = true;
        this.roles = ceuser.role;
        localStorage.setItem('loggedUser',this.loggedUser);
        localStorage.setItem('loggedIn',String(this.loggedIn));
      }
    });

     return validUser;
  }

  logOut() {
  this.loggedIn= false;
  this.loggedUser = undefined;
  this.roles = undefined;
  localStorage.removeItem('loggedUser');
  localStorage.setItem('loggedIn',String(this.loggedIn));
  this.router.navigate(['/login']);
  }

  public isAdmin():Boolean {
    if (!this.roles) 
    return false;
    return (this.roles.indexOf('ADMIN') >-1);

}

setLoggedUserFromLocalStorage(login : string) {
  this.loggedUser = login;
  this.loggedIn = true;
  this.getUserRoles(login);
}

getUserRoles(email :string){    
  this.users.forEach((ceuser) => {
    if( ceuser.email == email) {
        this.roles = ceuser.role;
    }
  });
}
}
