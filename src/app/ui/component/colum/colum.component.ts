import { Subscription } from 'rxjs';
import { ItemService } from './../../../service/item.service';
import { ColumnService } from './../../../service/column.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-colum',
  templateUrl: './colum.component.html',
  styleUrls: ['./colum.component.scss'],
  animations: [


  ]
})
export class ColumComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() items: Array<any>;
  @Input() id: string;
  counter: number;
  openmenu = false;
  itemSub: Subscription;
  @Output() onDelete = new EventEmitter<string>();
  @Output() onChangeCounter = new EventEmitter<number>();
  lastPosSub: Subscription;
  lastPos: string;

  constructor(private columnService: ColumnService, private itemService: ItemService,
  ) { }
  ngOnDestroy(): void {
    this.itemSub.unsubscribe();
  }
  ngOnInit(): void {
    this.init(this.id);

  }

  private init(id: string): void {
    this.itemSub = this.itemService.getItemData(id).subscribe(item => {
      this.items = item;
    });
  }
  deleteCurrentColumn(): void {
    this.onDelete.emit(this.id);
    this.columnService.deleteCurrentColumn(this.id).subscribe(response => {
    })
  }
  OnDeleteItem($event): void {
    this.items = this.items.filter(item => item.id !== $event);
  }
  onInput($event): void {
    this.items.push($event);
  }
  private lastPosition() {
    this.lastPosSub = this.itemService.getLastItemPos().subscribe(pos => {
      this.lastPos = pos.id
    })
  }
  changeDate($event): void {
    const obj = this.items.find(item => item.id === $event.id);
    obj.date = $event.date;
    obj.title = $event.title;
    obj.tag = $event.tag;
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      console.log(this.id)
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.itemService.moveItemIntoArray(this.items[event.currentIndex].id, this.items, event.currentIndex).subscribe();
    } else {
      this.lastPosition();
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.itemService.TransferItem(this.id, event.container.data, event.currentIndex, this.lastPos).subscribe();


    }
  }


}
