import { Component, OnInit } from "@angular/core";
import { SuppliersService } from "../suppliers.service";

import { Subject } from "rxjs";

import "rxjs/add/operator/map";

@Component({
  selector: "app-suppliers",
  templateUrl: "./suppliers.component.html",
  styleUrls: ["./suppliers.component.scss"]
})
export class SuppliersComponent implements OnInit {
  suppliers: any = [];

  tableLoading: boolean = false;

  constructor(private supplierSer: SuppliersService) {}

  ngOnInit() {
    this.tableLoading = true;
    this.supplierSer.getSuppliers().subscribe(resp => {
      this.suppliers = resp.data;
      this.tableLoading = false;
    });
  }
}
