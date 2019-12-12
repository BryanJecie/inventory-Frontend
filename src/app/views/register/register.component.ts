import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ErrorsService } from "../../helpers/errors.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "register.component.html"
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  api: string = environment.api + "auth";

  btnLoginLoading: boolean = false;

  isSuccess: boolean = false;
  message: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public errors: ErrorsService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      password_confirmation: ["", [Validators.required]]
    });
  }

  onRegister() {
    this.btnLoginLoading = true;

    this.http.post<any>(this.api + "/signUp", this.form.value).subscribe(
      resp => {
        this.message = resp.message;
        this.isSuccess = true;
        this.btnLoginLoading = false;
        this.form.reset();
      },
      (errorResponse: HttpErrorResponse) => {
        let status = errorResponse.status;

        if (status === 422) {
          this.errors.record(errorResponse.error.error.errors);
        }

        if (status === 500) {
          this.errors.record({
            email: ["The Email you entered is already been taken!"]
          });
        }
        this.btnLoginLoading = false;
      }
    );
  }
}
