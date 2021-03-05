import { ItemService } from './../../../service/item.service';
import { Component, Input, OnInit, OnDestroy, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { Subscription, } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit, OnDestroy {
  title = new FormControl('', Validators.required);
  lastPos: string;
  lastPosSub: Subscription;
  id: string;
  CreateItemSub: Subscription;
  item: any;
  @Output() onAdd = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    private itemService: ItemService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string, item: any }) { }

  ngOnInit(): void {
    this.init();
  }
  ngOnDestroy(): void {
    this.lastPosSub.unsubscribe();
  }
  closeDialog(): void {
    this.dialogRef.close('close');
  }
  private init() {
    this.lastPosSub = this.itemService.getLastItemPos().subscribe(pos => {
      this.lastPos = pos.id
    })

  }
  onSubmit(): void {
    const title = this.title.value;
    this.init();
    this.CreateItemSub = this.itemService.createItem(this.lastPos, title, this.data.id)
      .pipe(tap((item) => {
        this.dialogRef.close(item);
      }
      )).subscribe();

  }
}
