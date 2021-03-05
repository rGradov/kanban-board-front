import { ItemService } from './../../../service/item.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() date: any;
  @Input() title: string;
  @Input() tag: string;
  @Input() id: string;
  @Output() onDeleteItem = new EventEmitter<string>();
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
  }
  deleteItem(): void {
    this.onDeleteItem.emit(this.id);
    this.itemService.deleteCurrentItem(this.id).subscribe();

  }

}
