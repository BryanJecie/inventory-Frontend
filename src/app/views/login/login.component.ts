import { Component, OnInit } from "@angular/core";

import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../config/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ErrorsService } from "../../helpers/errors.service";
import { SuppliersService } from "../suppliers/suppliers.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit {
  name: string = "Login";

  btnLoginText: string = "Login";
  btnLoginLoading: boolean = false;

  isError: boolean;
  msgError: string;
  f: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public errors: ErrorsService
  ) {}

  ngOnInit() {
    this.f = this.formBuilder.group({
      email: ["admin@admin.com", [Validators.required]],
      password: ["secret", [Validators.required]]
    });
  }

  onLogin() {
    this.isError = false;

    this.btnLoginLoading = true;
    this.btnLoginText = "";
    this.auth.login(this.f.value).subscribe(
      resp => {
        this.router.navigate(["/dashboard"]);
      },
      (errorResponse: HttpErrorResponse) => {
        switch (errorResponse.status) {
          case 422:
            this.errors.record(errorResponse.error);
            break;
          case 401:
            this.isError = true;
            this.msgError = errorResponse.error.message;
            break;
          case 500:
            this.isError = true;
            this.msgError = "Apache Or Database Error";
            break;
        }
        this.btnLoginLoading = false;
        this.btnLoginText = "Login";
      }
    );
  }
}
