import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  transactionReference: string = '';
  grandTotal: number = 0;
  email: string = '';
  maskedCardNumber: string = '';
  expiryDate: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Récupérer les paramètres de la requête
    this.route.queryParams.subscribe(params => {
      this.transactionReference = params['transactionReference'] || 'N/A';
      this.grandTotal = params['grandTotal'] ? parseFloat(params['grandTotal']) :150; // Assurez-vous que grandTotal est un nombre
      this.email = params['email'] || '';
      this.maskedCardNumber = this.maskCardNumber(params['cardNumber']);
      this.expiryDate = params['expiryDate'] || '';
    });
  }

  // Masquer le numéro de carte (afficher seulement les 4 derniers chiffres)
  maskCardNumber(cardNumber: string): string {
    return cardNumber ? `**** **** **** ${cardNumber.slice(-4)}` : '';
  }

  // Retourner à la page des produits ou à la page d'accueil
  goBack(): void {
    this.router.navigate(['/products']);
  }
}
