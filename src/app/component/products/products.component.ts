// src/app/products/products.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public productList: any = [];  // Liste complète des produits
  public filteredProductList: any = [];  // Liste des produits filtrés
  public categoryList: any = [];  // Liste des catégories de produits
  public minPrice: number = 0;  // Prix minimum pour le filtrage
  public maxPrice: number = 1000;  // Prix maximum pour le filtrage
  selectedMinPrice: number = 0;
  selectedMaxPrice: number = 1000;

  public selectedCategory: string = 'All';  // Catégorie sélectionnée pour filtrer

  constructor(private api: ApiService, private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    // Récupère la liste des produits et des catégories lors de l'initialisation du composant
    this.getProductList();
    this.getCategories();
  }

  // Récupère la liste complète des produits
  getProductList() {
    this.api.getProduct().subscribe((res: any) => {
      this.productList = res;  // Affecte la réponse à la liste des produits
      this.filteredProductList = res;  // Initialise la liste filtrée avec tous les produits
    });
  }

  // Récupère la liste des catégories de produits
  getCategories() {
    this.api.getAllCategories().subscribe((data: any) => {
      this.categoryList = data;  // Affecte la liste des catégories récupérées
    });
  }

  // Applique les filtres (catégorie, prix, remise, recherche)
  selectedRating: number = 0; // Default to show all ratings

applyFilters() {
  if (this.selectedMinPrice > this.selectedMaxPrice) {
    [this.selectedMinPrice, this.selectedMaxPrice] = [this.selectedMaxPrice, this.selectedMinPrice];
    console.warn('Min price was greater than max price. Values have been swapped.');
  }

  console.log('Filtered range:', this.selectedMinPrice, '-', this.selectedMaxPrice);
  console.log('Filtered rating:', this.selectedRating);

  this.filteredProductList = this.productList.filter((item: any) => {
    const matchesCategory =
      this.selectedCategory === 'All' || item.category === this.selectedCategory;
    const matchesPrice =
      item.price >= this.selectedMinPrice && item.price <= this.selectedMaxPrice;
    const matchesRating =
      this.selectedRating === 0 || (item.rating && item.rating.rate >= this.selectedRating);

    return matchesCategory && matchesPrice && matchesRating;
  });
}


  // Gère le changement de catégorie pour filtrer les produits
  filterCategory(event: any) {
    this.selectedCategory = event.target.value;  // Met à jour la catégorie sélectionnée
    this.applyFilters();  // Applique les filtres après le changement de catégorie
  }

  // Ajoute un produit au panier
  addtocart(item: any) {
    if (localStorage.getItem('authToken')) {
      // Si l'utilisateur est authentifié, ajoute au panier
      this.cartService.addToCart(item);
    } else {
      // Si l'utilisateur n'est pas authentifié, ajoute également au panier (ajouter une gestion d'authentification ici si nécessaire)
      this.cartService.addToCart(item);
    }
  }

}
