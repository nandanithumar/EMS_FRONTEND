import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { StateService } from './state-component/state.service';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  private cache : Map<string, [HttpResponse<any>, number]> = new Map<string, [HttpResponse<any>, number]>();
  subscription:any;

  constructor(private stateService : StateService){
    this.subscription = this.stateService.isSearching.subscribe((val)=>{
      this.result = val
    })
  }
  result = false;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method !== 'GET') {
      this.cache.clear()
      return next.handle(request);
    }

    this.stateService.isSearching.pipe(map((data)=> {
      if(data){
        this.result = true;
      }
      else{

        this.result = false;
      }
    })).subscribe()

    if(this.result && request.method==='GET'){
      return next.handle(request)
    }


    const cachedResponse = this.cache.get(request.url);

    if (cachedResponse && cachedResponse[1] > Date.now()) {
      return of(cachedResponse[0]);
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const expirationTime = Date.now() + 60000; // set expiration time to 1 minute from now
          this.cache.set(request.url, [event, expirationTime]);
        }
      })
    );
  }
}


