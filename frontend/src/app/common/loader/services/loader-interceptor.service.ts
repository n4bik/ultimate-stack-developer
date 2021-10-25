import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {LoaderService} from './loader.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loaderService: LoaderService) { }

  removeRequest(httpRequest: HttpRequest<any>) {
    const requestIndex = this.requests.indexOf(httpRequest);
    if (requestIndex >= 0) {
      this.requests.splice(requestIndex, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(httpRequest);
    // console.log('Requests count: ' + this.requests.length);

    this.loaderService.isLoading.next(true);
    return new Observable((observer) => {
      const subscription = next.handle(httpRequest)
          .subscribe((event) => {
                if (event instanceof HttpResponse) {
                  this.removeRequest(httpRequest);
                  observer.next(event);
                }
              },
              (err) => {
                alert('error' + err);
                this.removeRequest(httpRequest);
                observer.error(err);
              },
              () => {
                this.removeRequest(httpRequest);
                observer.complete();
              });
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(httpRequest);
        subscription.unsubscribe();
      };
    });
  }
}
