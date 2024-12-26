import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'https://fakestoreapi.com/auth/login';  // URL de l'API

  constructor(private http: HttpClient) {}

  // Méthode pour effectuer une requête de connexion
  login(username: string, password: string): Observable<any> {
    const body = {
      username: username,
      password: password
    };
    return this.http.post(this.baseUrl, body);  // Envoie une requête POST avec les identifiants
  }
}
