import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LexoRank } from 'lexorank';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {


  constructor(private http: HttpClient) { }
  getItemData(id: string): Observable<any> {
    return this.http.get<any>(`/api/items/${id}`);
  }
  deleteCurrentItem(id: string): Observable<any> {
    return this.http.delete<any>(`/api/items/${id}`);
  }
  getLastItemPos(): Observable<any> {
    return this.http.get<string>(`/api/items/last/`);
  }
  createItem(position: string, itemTitle: string, id: string): Observable<any> {
    const body = {
      title: itemTitle,
      pos: this.createItemPos(position),
      columnId: id
    }
    return this.http.post('/api/items/post', body);
  }
  private createItemPos(pos: string): string {
    return LexoRank.parse(pos).genNext().toString();
  }


  moveItemIntoArray(id: string, data: Array<any>, currentId: any): Observable<any> {
    let currentPos: string;
    if (currentId - 1 >= 0 && currentId + 1 < data.length) {
      console.log('work')
      currentPos = LexoRank.parse(data[currentId - 1].pos).between(LexoRank.parse(data[currentId + 1].pos)).toString();
      return this.http.put(`/api/items/${id}`, { pos: currentPos });
    } else if (currentId - 1 < 0) {
      currentPos = LexoRank.parse(data[currentId + 1].pos).genPrev().toString();
      return this.http.put(`/api/items/${id}`, { pos: currentPos });
    }
    else if (currentId + 1 >= data.length) {
      currentPos = LexoRank.parse(data[currentId - 1].pos).genNext().toString();
      return this.http.put(`/api/items/${id}`, { pos: currentPos });
    }
  }


  TransferItem(id: string, data: Array<any>, currentId: any, lastPos: string): Observable<any> {
    let currentPos: string;
    let itemId = data[currentId].id;
    if (currentId - 1 >= 0 && currentId + 1 < data.length) {
      currentPos = LexoRank.parse(data[currentId - 1].pos).between(LexoRank.parse(data[currentId + 1].pos)).toString();
      return this.http.put(`/api/items/${itemId}`, { columnId: id, pos: currentPos });
    } else if (currentId - 1 < 0) {
      // currentPos = LexoRank.parse(data[currentId + 1].pos).genPrev().toString();
      return this.http.put(`/api/items/${itemId}`, { columnId: id, pos: lastPos });
      console.log(id)
    }
    else if (currentId + 1 >= data.length) {
      currentPos = LexoRank.parse(data[currentId - 1].pos).genNext().toString();
      console.log()
      return this.http.put(`/api/items/${itemId}`, { columnId: id, pos: currentPos });
    }
  }
}
