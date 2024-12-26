import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Product } from 'src/app/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  public newProduct: Product = new Product(); // Initialize an empty product object

  constructor(private api: ApiService, private router: Router) {}

  // Method to handle form submission
  addProduct(): void {
    this.api.addProduct(this.newProduct).subscribe(
      (response) => {
        alert('Product added successfully!');
        this.newProduct = new Product(); // Reset form data after product is added
        this.router.navigate(['/products']); // Adjust the path according to your routes
      },
      (error) => {
        console.error('Error adding product:', error);
        alert('There was an error adding the product.');
      }
    );
  }
}
