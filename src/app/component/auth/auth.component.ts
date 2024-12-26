import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  public username: string = '';  // Nom d'utilisateur saisi par l'utilisateur
  public password: string = '';  // Mot de passe saisi par l'utilisateur
  public showPassword: boolean = false; // Contrôle de l'affichage du mot de passe
  public errorMessage: string = '';  // Message d'erreur en cas d'échec de connexion

  constructor(private authService: AuthService, private router: Router) {}

  // Méthode pour basculer l'affichage du mot de passe
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Méthode pour gérer l'entrée dans le champ de mot de passe
  onPasswordInput(): void {
    // You don't need additional logic here, the icon will appear based on `password.length > 0`
  }

  // Méthode pour gérer la soumission du formulaire de connexion
  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // On successful login, store the token and navigate to payment page
        localStorage.setItem('authToken', response.token);
        alert('Connexion réussie !');
        this.router.navigate(['/paiement']);  // Redirect to the payment page
      },
      error: () => {
        this.errorMessage = 'Échec de la connexion. Vérifiez vos identifiants.';
      }
    });
  }
  
}
