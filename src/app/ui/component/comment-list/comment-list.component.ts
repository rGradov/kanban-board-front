import { CommentService } from './../../../service/comment.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  @Input() text: string;
  @Input() date: Date;
  @Input() id: string;
  @Output() onDelete = new EventEmitter<any>();

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
  }
  deleteCurentComment(): void {
    this.commentService.deleteCurrentComment(this.id).subscribe(() => this.onDelete.emit(this.id));
  }


}
