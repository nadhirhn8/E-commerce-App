import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './component/auth/auth.component';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './component/details/details.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { UpdateProductComponent } from './component/update-product/update-product.component';
import { PaiementComponent } from './paiement/paiement.component';
import { TicketComponent } from './ticket/ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    ProductsComponent,
    AuthComponent,
    DetailsComponent,
    AddProductComponent,
    UpdateProductComponent,
    PaiementComponent,
    TicketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
