import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  product: any = {};

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.getProduitById(id).subscribe((res) => {
        this.product = res[0]; // Assuming the API returns an array with the product
      });
    }
  }
  

  updateProducts() {
    if (this.product && this.product.id) {
      console.log('Navigating to details with id:', this.product.id); // Check the id
      this.api.updateProduct(this.product).subscribe((response) => {
        alert('Product updated successfully!');
        this.router.navigate(['/details', this.product.id]); // Navigate after update
      });
    } else {
      console.error('Product id is missing');
    }
  }
  
}
