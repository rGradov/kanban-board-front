import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  @Input() title: string;
  @Input() type: string;

  constructor() { }

  ngOnInit(): void {
    this.type = 'column';
  }

}
