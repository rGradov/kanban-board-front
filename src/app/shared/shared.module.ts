import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { AvatarstacksComponent } from './avatarstacks/avatarstacks.component';
import { CounterComponent } from './counter/counter.component';
import { FormComponent } from './form/form.component';
import { DeleteComponent } from './alert/delete/delete.component';
import { AddColumnButtonComponent } from './button/add-column/add-column.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ColumnDialogComponent } from './form/column-dialog/column-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddItemButtonComponent } from './button/add-item/add-item.component';



@NgModule({
  declarations: [
    AlertComponent,
    AvatarstacksComponent,
    CounterComponent,
    FormComponent,
    DeleteComponent,
    AddColumnButtonComponent,
    ColumnDialogComponent,
    AddItemButtonComponent

  ],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AlertComponent,
    DeleteComponent,
    AvatarstacksComponent,
    CounterComponent,
    FormComponent,
    AddColumnButtonComponent,
    AddItemButtonComponent
  ]
})
export class SharedModule { }
