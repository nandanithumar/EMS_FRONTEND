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
      console.log(val)
      this.result = val
      console.log("Hii i am updating the result",val)
    })
  }
  result = false;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method !== 'GET') {
      console.log(this.cache)
      console.log(request.url)
      console.log(request.method)
      // remove the corresponding cache entry for non-GET requests
      // if(this.cache.delete(request.url.slice(0, request.url.lastIndexOf('/')))){
      //   console.log("cach deleted for non get requests=====================================");
      // }
      this.cache.clear()
      console.log(this.cache);
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


    console.log(this.cache)
    const cachedResponse = this.cache.get(request.url);
    console.log(cachedResponse)

    if (cachedResponse && cachedResponse[1] > Date.now()) {
      console.log(`Returning cached response for "${request.url}"`);
      return of(cachedResponse[0]);
    }

    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const expirationTime = Date.now() + 60000; // set expiration time to 1 minute from now
          console.log("Not from cached memory...!")
          console.log(`Caching response for "${request.url}"`);
          this.cache.set(request.url, [event, expirationTime]);
        }
      })
    );
  }
}


