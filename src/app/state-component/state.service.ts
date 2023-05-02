import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {State} from '../state.model';
import Page from '../page.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private baseUrl = 'http://localhost:8080/';

  isSearching = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getStatesList(): Observable<State[]> {
    return this.http.get<State[]>(`${this.baseUrl}` + 'states/all');
  }

  createState(states: State | undefined): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + 'states', states);
  }

    deleteState(id: string): Observable<State> {
    console.log('Attempting to delete');
    return this.http.delete(`${this.baseUrl}states/${id}`);
    
  }

  getState(id: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}states/${id}`);
  }

  updateState(id: string | undefined, value: State): Observable<Object> {
    // console.log(Object.values(value[0]), Object.keys(value[0]) +"=======================================");
    return this.http.put(`${this.baseUrl}states`, value);
  }

  searchStatesByRefObjectUriAndName(ids: string[] | null, refObjectUri: string | null, stateName: string | null, page: number, size: number): Observable<Page> {
    console.log()
    const params = new HttpParams()
      .set('ids', ids ? ids.join(',') : '')
      .set('refObjectUri', refObjectUri ? refObjectUri : '')  
      .set('name', stateName ? stateName : '')
      .set('page', page.toString())
      .set('size', size.toString());
  
    return this.http.get<Page>(`${this.baseUrl}states`, {params: params});
  }
  
}
