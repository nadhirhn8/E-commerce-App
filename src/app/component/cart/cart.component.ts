import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products: any[] = [];  // List of products in the cart
  public grandTotal: number = 0;  // Grand total of the cart
  public taxRate: number = 0.2;  // Example tax rate of 20%
  public shippingCost: number = 10;  // Example fixed shipping cost

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
        this.products = res;  // Assign the fetched products
        this.initializeQuantities();  // Initialize quantity and total for each product
        this.updateGrandTotal();  // Update the grand total after initializing
      });
  }

  // Initialize quantities and total for each product
  initializeQuantities(): void {
    this.products.forEach((product: any) => {
      if (product.quantity === undefined) {
        product.quantity = 1;  // Set default quantity to 1 if not defined
      }
      product.total = product.quantity * product.price;  // Set initial total for the product
    });
  }

  // Update the quantity of a product and its total
  updateQuantity(item: any, action: string): void {
    if (action === 'increase') {
      item.quantity++;  // Increase the quantity
    } else if (action === 'decrease') {
      item.quantity = Math.max(1, item.quantity - 1);  // Decrease the quantity (minimum 1)
    }
    item.total = item.quantity * item.price;  // Update the total for the product
    this.updateGrandTotal();  // Update the grand total after changing quantity
  }

  // Update the grand total by summing all item totals and adding taxes and shipping
  updateGrandTotal(): void {
    // Calculate the total for all products
    const productTotal = this.products.reduce((sum: number, item: any) => {
      return sum + (item.total || 0);  // Add the total of each product
    }, 0);

    // Calculate tax (20% for example)
    const taxAmount = productTotal * this.taxRate;

    // Add shipping cost (fixed for simplicity here)
    const totalWithShipping = productTotal + this.shippingCost;

    // Calculate the grand total (products + tax + shipping)
    this.grandTotal = productTotal + taxAmount + this.shippingCost;

    // Round grandTotal to two decimal places (for currency format)
    this.grandTotal = parseFloat(this.grandTotal.toFixed(2));
  }

  // Remove an item from the cart after confirmation
  removeItem(item: any): void {
    if (confirm('Are you sure you want to remove this item?')) {
      this.cartService.removeCartItem(item);  // Remove the item via the service
      alert('Item removed successfully');
      this.refreshCart();  // Refresh the cart to update the list
    }
  }

  // Empty the cart by removing all items
  emptyCart(): void {
    this.cartService.removeAllCart();  // Remove all items via the service
    this.refreshCart();  // Refresh the cart to update the list
  }

  // Refresh the cart and update the total after removing an item or emptying the cart
  refreshCart(): void {
    this.cartService.getProducts().subscribe(res => {
      this.products = res;  // Fetch the updated products
      this.updateGrandTotal();  // Update the grand total
    });
  }

  // Proceed to checkout (example for redirection or payment logic)
  checkout(): void {
    alert('Proceeding to checkout...');
    // You can implement further logic like redirecting to the payment page
  }
}
