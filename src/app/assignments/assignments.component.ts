import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, pairwise, tap, filter, throttleTime } from 'rxjs/operators';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})


export class AssignmentsComponent implements OnInit {
  titre = 'Liste des assignments : ';
  assignments: Assignment[] = [];

  page=1;
  limit=30;
  prevPage;
  nextPage;
  totalDocs;
  totalPages;
  hasPrevPage;
  hasNextPage;

  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;
  ancienneDistance:number;
  idassignment: any;
 
  constructor(private assignmentsService: AssignmentsService,
              private ngZone:NgZone,
              private route:ActivatedRoute,
              private router:Router,
              public authService : AuthService) {}

  ngAfterViewInit() {
   
    console.log("### Dans le afterViewInit")
    this.scroller.elementScrolled()
    .pipe(
      map(event => {
        return this.scroller.measureScrollOffset('bottom');
      }),
      pairwise(),
      filter(([y1, y2]) => {
        return y2 < y1 && y2 < 140;
      }),
      throttleTime(400) 
    ).subscribe(event => {
      this.ngZone.run(() => {
        this.pageSuivante();
        console.log("JE CHARGE")
      });
    })
  }

  ngOnInit(): void {
    
    console.log(
      'Composant assignments, dans le ngOnInit, on demande aux service le tableau des assignments'
    );
  
    this.getAssignmentsPourScroll();
  }

  getAssignmentsPourScroll() {
    this.assignmentsService.getAssignmentsPagines(this.page, this.limit)
    .subscribe(data => {
      this.page = data["page"];
      this.prevPage = data["prevPage"];
      this.nextPage = data["nextPage"];
      this.totalDocs = data['totalDocs'];
      this.totalPages = data["totalPages"];
      this.hasPrevPage = data["hasPrevPage"];
      this.hasNextPage = data["hasNextPage"];
      console.log("count = " + this.totalDocs, " nbPages = " + this.totalPages);
      this.assignments = [...this.assignments, ...data['docs']]
    })
  }

  onClickEdit(id) {
    this.router.navigate(["assignments", id, "edit"]
   );
  }
 
  IsAdmin(){
    this.authService.isAdmin();
  }

  pageSuivante() {
    this.page = this.nextPage;
    this.getAssignmentsPourScroll()
  }

  pagePrecedente() {
    this.page = this.prevPage;
    this.getAssignmentsPourScroll()
  }
}
