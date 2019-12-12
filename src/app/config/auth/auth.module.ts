import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "../auth.service";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthService],
  declarations: []
})
export class AuthModule {}
