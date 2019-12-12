import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpClient
} from "@angular/common/http";

import { Observable } from "rxjs/Rx";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/mergeMap";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  api: string = environment.api + "auth";

  constructor(private injector: Injector, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).catch((errorResponse: HttpErrorResponse) => {
      const error =
        typeof errorResponse.error !== "object"
          ? JSON.parse(errorResponse.error)
          : errorResponse;
      if (
        (errorResponse.status === 401 &&
          error.error.error === "token_expired") ||
        error.error.error.message === "Token has expired"
      ) {
        const http = this.injector.get(HttpClient);
        return http.post<any>(this.api + "/refresh", {}).flatMap(data => {
          localStorage.setItem("token", data.token);
          const cloneRequest = request.clone({
            setHeaders: { Authorization: `Bearer ${data.token}` }
          });
          return next.handle(cloneRequest);
        });
      }
      return Observable.throw(errorResponse);
    });
  }
}
