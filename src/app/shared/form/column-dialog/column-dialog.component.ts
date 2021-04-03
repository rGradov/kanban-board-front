import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ColumnService } from 'src/app/service/column.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-column-dialog',
  templateUrl: './column-dialog.component.html',
  styleUrls: ['./column-dialog.component.scss']
})
export class ColumnDialogComponent implements OnInit, OnDestroy {
  title = new FormControl('', Validators.required);
  lastPos: any;
  lastPosSub: Subscription;
  CreateColumnSub: Subscription;
  error: string;
  elem: any;

  constructor(public dialogRef: MatDialogRef<ColumnDialogComponent>,
    private columnService: ColumnService
  ) { }
  ngOnInit(): void {
    this.init();
  }
  ngOnDestroy(): void {
    if (this.elem) {
      this.CreateColumnSub.unsubscribe();
    }
    if (this.lastPos) {
      this.lastPosSub.unsubscribe();
    }
  }
  private init() {
    this.lastPosSub = this.columnService.getLastColumnPos().subscribe(pos => {
      if (pos) {
        this.lastPos = pos.id
      }
    })

  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  onSubmit(): void {
    const title = this.title.value;
    this.error = '';
    this.CreateColumnSub = this.columnService.createColumn(this.lastPos, title).pipe(tap(item => {
      this.columnService.addColumnSubject.next(item);
      this.dialogRef.close();
    })).subscribe(
      elem => this.elem = elem,
      err => this.error = err,
      () => console.log('HTTP request completed.')
    );
  }

}
