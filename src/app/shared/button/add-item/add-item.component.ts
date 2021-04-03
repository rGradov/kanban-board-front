import { ItemService } from './../../../service/item.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemComponent } from 'src/app/ui/component/add-item/add-item.component';

@Component({
  selector: 'app-add-item-btn',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemButtonComponent implements OnInit {
  @Input() id: string;
  @Output() onAdd = new EventEmitter<any>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddItemComponent, { data: { id: this.id } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onAdd.emit(result);
      }
    })
  }
}
