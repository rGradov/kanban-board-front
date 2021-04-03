import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }


  getComments(id: string): Observable<any> {
    return this.http.get<any>(`/api/comments/${id}`)
  }
  postComments(text: string, id: string): Observable<any> {
    const body = {
      text: text,
      itemId: id,
      date: new Date()
    }
    return this.http.post('/api/comments/post', body);
  }
  deleteCurrentComment(id: string): Observable<any> {
    return this.http.delete<any>(`api/comments/${id}`)
  }
}
