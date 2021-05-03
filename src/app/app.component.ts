import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  titre = "Application de gestion d'Assignments";

  loggedIn : boolean;

  constructor(public authService:AuthService,
              private router:Router,
              private assignmentsService:AssignmentsService) {}

  ngOnInit () {
    let loggedin: string;
    let loggedUser:string;
    loggedin = localStorage.getItem('loggedIn');
    loggedUser = localStorage.getItem('loggedUser');
    if (loggedin != "true" || !loggedUser)
        this.router.navigate(['/login']);
    else
     this.authService.setLoggedUserFromLocalStorage(loggedUser);
  }

  onLogout(){
    this.authService.logOut();
  }

  IsAdmin(){
    this.authService.isAdmin();
  }


}
