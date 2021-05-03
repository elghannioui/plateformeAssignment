import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule } from '@angular/forms';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { RouterModule, Routes } from '@angular/router';
import { EditAssigmentComponent } from './assignments/edit-assigment/edit-assigment.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './shared/login/login.component';
import { MatTabsModule} from '@angular/material/tabs'

import { from } from 'rxjs';

const routes:Routes = [
  {
    path:"", component:LoginComponent
  },
  {
    path:"login", component:LoginComponent
  },
  {
    path:"home", component:AssignmentsComponent
  },
  {
    path:"add", component:AddAssignmentComponent
  },
  {
    path:"assignments/:id", component:AssignmentDetailComponent
  },
  {
    path:"assignments/:id/edit",
    component:EditAssigmentComponent,
    //canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssigmentComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatSlideToggleModule,
    MatNativeDateModule, MatListModule, MatCardModule, MatCheckboxModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ScrollingModule,
    CommonModule,
    RouterModule.forRoot(routes),
    MatTabsModule
  ],
  exports:[
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
