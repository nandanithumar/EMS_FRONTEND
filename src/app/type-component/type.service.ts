import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Type} from '../type.model';
import Page from '../page.model';


@Injectable({
  providedIn: 'root',
})
export class Typeservice {
  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  getTypesList(): Observable<Type[]> {
    return this.http.get<Type[]>(`${this.baseUrl}types/all`);
  }


  // createType(type: Type | undefined, refObjectUri: string | undefined): Observable<Type > {
  //   const url = `${this.baseUrl}/${refObjectUri}`;
  //   return this.http.post<Type>(`${this.baseUrl}types/${refObjectUri}`, type);
  // }

  createType(type: Type, refObjectUri?: string): Observable<Type> {
    const url = `${this.baseUrl}/${refObjectUri}`;
    return this.http.post<Type>(`${this.baseUrl}types/${refObjectUri}`, type);
  }
  
  

  deleteType(id: string): Observable<Type> {
    const data = this.http.delete(`${this.baseUrl}types/${id}`);
    console.log(data);
    data.subscribe((data) => {
      console.log(data);
    });
    console.log('returning back');
    return data;
  }


  getType(id: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}types/${id}`);
  }

  updateType(value: Type): Observable<Object> {
    return this.http.put(`${this.baseUrl}types`, value);
  }

  
  searchTypesByRefObjectUriAndName(ids: string[] | null,stateId:string, refObjectUri: string | null, stateName: string | null, page: number, size: number): Observable<Page> {
    console.log()
    const params = new HttpParams()
      .set('ids', ids ? ids.join(',') : '')
      .set('stateId',stateId?stateId:'')
      .set('refObjectUri', refObjectUri ? refObjectUri : '')  
      .set('name', stateName ? stateName : '')
      .set('page', page.toString())
      .set('size', size.toString());
  
    return this.http.get<Page>(`${this.baseUrl}types`, {params: params});
  }

}
