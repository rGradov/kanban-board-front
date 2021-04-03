import { ItemService } from 'src/app/service/item.service';
import { EdditItemComponent } from './../../../ui/modal/eddit-item/eddit-item.component';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-item-btn',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemBtnComponent implements OnInit {
  @Input() id: string;
  date: Date;
  tag: string;
  @Output() changeDate = new EventEmitter<any>();
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDiaog(): void {
    const dialogRef = this.dialog.open(EdditItemComponent, { data: { id: this.id, date: this.date, tag: this.tag } })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.changeDate.emit(result)
      }
    })
  }

}
