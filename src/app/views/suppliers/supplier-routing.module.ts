import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SuppliersComponent } from "./suppliers/suppliers.component";
import { NewSupplierComponent } from "./new-supplier/new-supplier.component";
import { InvoicesComponent } from "./invoices/invoices.component";
import { NewInvoiceComponent } from "./new-invoice/new-invoice.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Supplier"
    },
    children: [
      {
        path: "",
        redirectTo: "manage"
      },
      {
        path: "manage",
        component: SuppliersComponent,
        data: {
          title: ""
        }
      },
      {
        path: "new",
        component: NewSupplierComponent,
        data: {
          title: "New"
        }
      },
      {
        path: "invoice",
        component: InvoicesComponent,
        data: {
          title: "Invoice"
        }
      },
      {
        path: "invoice/new",
        component: NewInvoiceComponent,
        data: {
          title: "New"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule {}
