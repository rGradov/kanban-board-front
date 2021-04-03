import { AuthService } from './../../auth/auth.service';
import { ColumnService } from './../../service/column.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  columns: Array<any>;
  private columnSub: Subscription;
  constructor(private columnService: ColumnService,
    public authService: AuthService,
    private router: Router) { }
  ngOnInit(): void {
    if (!this.authService.logIn) {
      this.router.navigate(['/login']);
    }
    this.init();
    this.columnService.addColumnSubject.subscribe(elem => this.columns.push(elem));
  }
  ngOnDestroy(): void {
    this.columnSub.unsubscribe();
  }
  OnDelete($event): void {
    this.columns = this.columns.filter(column => column.id !== $event);
  }

  private init(): void {
    this.columnSub = this.columnService.getColumData().subscribe(column => {
      this.columns = column;
    });
  }
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    const columnId: string = this.columns[event.currentIndex].id;
    console.log(this.columns[event.currentIndex].pos);
    this.columnService.postPosColumn(columnId, this.columns, event.currentIndex).subscribe();
  }
}
