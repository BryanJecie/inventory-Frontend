import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SuppliersComponent } from "./suppliers/suppliers.component";
import { NewSupplierComponent } from "./new-supplier/new-supplier.component";
import { InvoicesComponent } from "./invoices/invoices.component";
import { NewInvoiceComponent } from "./new-invoice/new-invoice.component";
import { SupplierRoutingModule } from "./supplier-routing.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    SuppliersComponent,
    NewSupplierComponent,
    InvoicesComponent,
    NewInvoiceComponent
  ],
  imports: [SupplierRoutingModule, CommonModule, FormsModule]
})
export class SuppliersModule {}
