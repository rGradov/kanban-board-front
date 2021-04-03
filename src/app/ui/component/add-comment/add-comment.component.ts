import { Subscription } from 'rxjs';
import { CommentService } from './../../../service/comment.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  text = new FormControl('', Validators.required);
  postComentSub: Subscription;
  @Input() id: string;
  @Output() onAdd = new EventEmitter<any>();

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
  }

  PostComent(): void {
    console.log(this.id, this.text.value)
    const text = this.text.value
    this.postComentSub = this.commentService.postComments(text, this.id).subscribe(elem =>
      this.onAdd.emit(elem))

  }


}
