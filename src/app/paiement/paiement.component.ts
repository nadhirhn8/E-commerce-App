import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent {
  grandTotal: any;
  constructor(private router: Router) {}

  cardholderName: string = '';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  email: string = '';

  errorMessages: { [key: string]: string } = {};

  validateAndPay(): void {
    this.errorMessages = {};

    // Validation du nom du titulaire
    if (!this.cardholderName.trim()) {
      this.errorMessages['cardholderName'] = 'Le nom du titulaire est requis.';
    }

    // Validation du numéro de carte
    if (!/^\d{16}$/.test(this.cardNumber.replace(/\s+/g, ''))) {
      this.errorMessages['cardNumber'] = 'Le numéro de carte doit contenir exactement 16 chiffres.';
    }

    // Validation de la date d'expiration
    if (!/^\d{2}\/\d{2}$/.test(this.expiryDate)) {
      this.errorMessages['expiryDate'] = 'La date doit être au format MM/AA.';
    } else {
      const [month, year] = this.expiryDate.split('/').map(Number);
      const currentYear = new Date().getFullYear() % 100; // Récupère les deux derniers chiffres de l'année actuelle
      const maxYear = currentYear + 10;

      if (month < 1 || month > 12) {
        this.errorMessages['expiryDate'] = 'Le mois doit être entre 01 et 12.';
      } else if (year < currentYear || year > maxYear) {
        this.errorMessages['expiryDate'] = `L'année doit être entre ${currentYear} et ${maxYear}.`;
      }
    }

    // Validation du CVV
    if (!/^\d{3,4}$/.test(this.cvv)) {
      this.errorMessages['cvv'] = 'Le CVV doit contenir 3 ou 4 chiffres.';
    }

    // Validation de l'email
    if (!/^\S+@\S+\.\S+$/.test(this.email)) {
      this.errorMessages['email'] = 'Veuillez entrer une adresse e-mail valide.';
    }

    // Vérifiez s'il y a des erreurs
    if (Object.keys(this.errorMessages).length > 0) {
      return; // Arrêter si des erreurs existent
    }

    // Simuler un paiement réussi
    alert('✅ Paiement réussi ! Merci pour votre achat.');
    const transactionReference = Math.random().toString(36).substr(2, 9); // Example random reference
    // Assurez-vous que 'grandTotal' est bien calculé avant de naviguer.
this.router.navigate(['/ticket'], {
  queryParams: {
    transactionReference: transactionReference, 
    grandTotal: this.grandTotal,  // Assurez-vous que grandTotal est bien défini ici
    email: this.email,
    cardNumber: this.cardNumber,
    expiryDate: this.expiryDate
  }
});

    
    
  }
}
