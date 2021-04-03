import { CommentService } from './../../../service/comment.service';
import { Subscription, Observable, AsyncSubject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { ItemService } from 'src/app/service/item.service';
import { EditItemBtnComponent } from 'src/app/shared/button/edit-item/edit-item.component';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-eddit-item',
  templateUrl: './eddit-item.component.html',
  styleUrls: ['./eddit-item.component.scss']
})
export class EdditItemComponent implements OnInit, OnDestroy {
  itemSub: Subscription;
  item: any;
  commentSub: Subscription;
  commentList: Array<any>;
  title: Observable<string>;
  minDate = new Date();
  date: Date;
  description: string;
  openDialog = false;
  img: File;
  filename: string;
  object: any;
  src: any;
  tag: string;
  imgName: string;

  constructor(public dialogRef: MatDialogRef<EditItemBtnComponent>,
    private itemService: ItemService,
    private commentService: CommentService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string, date: Date, title: string, tag: string }

  ) { }

  ngOnInit(): void {
    this.date = this.data.date;
    this.init(this.data.id);
    this.loadCommentList(this.data.id)
  }
  ngOnDestroy(): void {
    this.itemSub.unsubscribe();
    const body = {
      img: this.src
    }
    console.log(body)
    this.itemService.updateData(this.data.id, body).subscribe((elem) => console.log(elem))
  }
  private init(id: string): void {
    this.itemSub = this.itemService.getitem(id).subscribe(itemData => {
      this.item = itemData;
      this.title = itemData.title;
      this.description = itemData.description;
      this.tag = itemData.tag;
      this.src = itemData.img;
    })
  }
  private loadCommentList(id: string): void {
    this.commentSub = this.commentService.getComments(id).subscribe(commentList => {
      this.commentList = commentList;
    })

  }
  addComment($event): void {
    this.commentList.push($event)

  }
  deleteComment($event): void {
    this.commentList = this.commentList.filter(elem => elem.id !== $event)
  }
  onChange(value) {
    this.itemService.updateDate(this.data.id, value).subscribe();
    this.date = value;
  }
  closeDialog(): void {

    this.data.date = this.date;
    this.data.tag = this.tag;
    console.log(this.data.date)
    this.dialogRef.close(this.data)
  }
  onChangeTitle(value): void {
    const body = {
      title: value
    }
    this.data.title = value;
    this.itemService.updateData(this.data.id, body).subscribe()
  }
  onChangeTag(value): void {
    const body = {
      tag: value
    }
    this.data.tag = value;
    this.itemService.updateData(this.data.id, body).subscribe()
  }
  onChangeDescription(value): void {
    const body = {
      description: value
    }
    this.itemService.updateData(this.data.id, body).subscribe()
  }

  onFileSelected(event) {
    this.img = <File>event.target.files[0];
    const fdata = new FormData();
    fdata.append('image', this.img, this.img.name)
    this.itemService.uploadimg(fdata).subscribe(res => {
      this.src = `http://localhost:3000/api/items/img/${res.filename}`
    })
  }



}
