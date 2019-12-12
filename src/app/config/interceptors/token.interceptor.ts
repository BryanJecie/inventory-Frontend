import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";

import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const requestApi: Array<any> = request.url.split("/");

    const api: Array<any> = environment.api.split("/");

    const token = localStorage.getItem("token");

    if (token && requestApi[2] === api[2]) {
      const newRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next.handle(newRequest);
    } else {
      return next.handle(request);
    }
  }
}
