import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { LexoRank } from 'lexorank';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {
  addColumnSubject = new Subject();

  constructor(private http: HttpClient) { }

  getColumData(): Observable<any> {
    return this.http.get<any>(`/api/columns`).pipe(map(
      event => event.sort((a, b) => {
        if (a.pos > b.pos) {
          return 1;
        } else {
          return -1;
        }
      })
    ));
  }
  getItemData(id: string): Observable<any> {
    return this.http.get<any>(`/api/items/${id}`);
  }
  deleteCurrentColumn(id: string): Observable<any> {
    return this.http.delete(`/api/columns/${id}`);
  }
  getLastColumnPos(): Observable<any> {
    return this.http.get<string>('/api/columns/last');
  }
  private createColumnPos(pos: string): string {
    return LexoRank.parse(pos).genNext().toString();
  }
  createColumn(position: string, titleColumn: string): Observable<any> {
    const body = {
      title: titleColumn,
      pos: this.createColumnPos(position)
    }
    return this.http.post('/api/columns/post', body);
  }
  postPosColumn(id: string, data: Array<any>, currentId: any): Observable<any> {
    let currentPos: string;
    if (currentId - 1 >= 0 && currentId + 1 < data.length) {
      currentPos = LexoRank.parse(data[currentId - 1].pos).between(LexoRank.parse(data[currentId + 1].pos)).toString();
      return this.http.put(`/api/columns/${id}`, { pos: currentPos });
    } else if (currentId - 1 < 0) {
      currentPos = LexoRank.parse(data[currentId + 1].pos).genPrev().toString();
      return this.http.put(`/api/columns/${id}`, { pos: currentPos });
    }
    else if (currentId + 1 >= data.length) {
      currentPos = LexoRank.parse(data[currentId - 1].pos).genNext().toString();
      return this.http.put(`/api/columns/${id}`, { pos: currentPos });
    }
  }
  lastpos(): string {
    const str = LexoRank.middle().toString();
    return str;
  }
}

