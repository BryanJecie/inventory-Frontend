import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class SuppliersService {
  supplierApi: string = environment.api + "suppliers";

  constructor(private http: HttpClient) {}

  getSuppliers() {
    return this.http.get<any>(this.supplierApi);
  }

  getSupplier(id) {
    return this.http.get<any>(this.supplierApi + id);
  }

  storeSupplier(form) {
    return this.http.post<any>(this.supplierApi + "add_supplier", form);
  }
}
