import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private id = "avtoNetJwtToken";

  constructor() { }

  isTokenExpired() {
    const token = this.getToken();
    if(token) {
      const decodedToken = jwtDecode(token);
      if(decodedToken.exp) {
        return decodedToken.exp < Date.now() / 1000;
      }
    }
    return true;
  }

  getToken(): string {
    return window.localStorage[this.id];
  }

  saveToken(token: string): void {
    window.localStorage[this.id] = token;
  }

  destroyToken(): void {
    window.localStorage.removeItem(this.id);
  }
}
