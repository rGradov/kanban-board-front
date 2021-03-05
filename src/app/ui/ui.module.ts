import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumComponent } from './component/colum/colum.component';
import { ItemComponent } from './component/item/item.component';
import { TagComponent } from './component/item/tag/tag.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { AddItemComponent } from './component/add-item/add-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ColumComponent,
    ItemComponent,
    TagComponent,
    AddItemComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    NgbModule,
    SharedModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule

  ],
  exports: [
    ColumComponent,
    ItemComponent,
    TagComponent,
  ]
})

export class UiModule { }
