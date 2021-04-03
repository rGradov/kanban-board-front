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
import { EdditItemComponent } from './modal/eddit-item/eddit-item.component';
import { AddCommentComponent } from './component/add-comment/add-comment.component';
import { CommentListComponent } from './component/comment-list/comment-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditTitleComponent } from './component/edit-title/edit-title.component';
import { HeaderComponent } from './component/header/header.component';

@NgModule({
  declarations: [
    ColumComponent,
    ItemComponent,
    TagComponent,
    AddItemComponent,
    EdditItemComponent,
    AddCommentComponent,
    CommentListComponent,
    EditTitleComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    NgbModule,
    SharedModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,

  ],
  exports: [
    ColumComponent,
    ItemComponent,
    TagComponent,
    HeaderComponent
  ]
})

export class UiModule { }
