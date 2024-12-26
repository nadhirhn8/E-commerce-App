import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = []; // Store cart items in an array
  private cartSubject = new BehaviorSubject<any[]>(this.cart); // Cart observable for other components to subscribe to

  constructor() { }

  // Get the current products in the cart
  getProducts() {
    return this.cartSubject.asObservable();  // Return observable so components can subscribe to changes
  }

  // Add a product to the cart
  addToCart(product: any): void {
    const found = this.cart.find(p => p.id === product.id);
    if (found) {
      found.quantity += product.quantity;  // Increase quantity if the product is already in the cart
      found.total = found.quantity * found.price; // Recalculate total
    } else {
      this.cart.push(product);  // Add new product to cart
      product.total = product.quantity * product.price; // Calculate total for the new product
    }
    this.cartSubject.next(this.cart); // Emit the new cart state to subscribers
  }

  // Remove a product from the cart
  removeCartItem(item: any): void {
    this.cart = this.cart.filter(p => p.id !== item.id); // Remove product by ID
    this.cartSubject.next(this.cart); // Emit the updated cart
  }

  // Clear all items in the cart
  removeAllCart(): void {
    this.cart = [];
    this.cartSubject.next(this.cart); // Emit empty cart
  }

  // Get the total price of all items in the cart
  getTotalPrice(): number {
    return this.cart.reduce((acc, item) => acc + item.total, 0); // Sum of all product totals
  }
}
