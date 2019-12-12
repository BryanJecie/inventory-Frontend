import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "./interfaces/user.model";
import "rxjs/add/operator/do";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  api: string = environment.api + "auth";

  constructor(private http: HttpClient, private router: Router) {}

  check(): boolean {
    return !!localStorage.getItem("user");
  }

  login(credentials: {
    username: string;
    password: string;
  }): Observable<boolean> {
    return this.http.post<any>(this.api + "/login", credentials).do(data => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", btoa(JSON.stringify(data.user)));
    });
  }
  logout(): void {
    this.http.get(this.api + "/logout").subscribe(resp => {
      localStorage.clear();
      this.router.navigate(["login"], {
        queryParams: {
          by: "11010101",
          logs: "unknown"
        }
      });
    });
  }

  getUser(): User {
    return localStorage.getItem("user")
      ? JSON.parse(atob(localStorage.getItem("user")))
      : null;
  }

  /*Set user info*/
  setUser(): Promise<boolean> {
    return this.http
      .get<any>(this.api + "/me")
      .toPromise()
      .then(resp => {
        if (resp.user) {
          localStorage.setItem("user", btoa(JSON.stringify(resp.user)));
          return true;
        }
        return false;
      });
  }
}
