import { ColumnDialogComponent } from './../../form/column-dialog/column-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-column-btn',
  templateUrl: './add-column.component.html',
  styleUrls: ['./add-column.component.scss']
})
export class AddColumnButtonComponent implements OnInit {
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(): void {
    this.dialog.open(ColumnDialogComponent)
  }

}
