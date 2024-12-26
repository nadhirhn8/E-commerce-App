import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './component/products/products.component';
import { CartComponent } from './component/cart/cart.component';
import { AuthComponent } from './component/auth/auth.component';
import { DetailsComponent } from './component/details/details.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { UpdateProductComponent } from './component/update-product/update-product.component';
import { PaiementComponent } from './paiement/paiement.component';
import { TicketComponent } from './ticket/ticket.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' }, 
  { path: 'ticket', component: TicketComponent },
  { path: 'auth', component: AuthComponent }, // Authentication page route
  { path: 'products', component: ProductsComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'update-product/:id', component: UpdateProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'details/:id', component: DetailsComponent },
  {path: 'paiement' , component : PaiementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
