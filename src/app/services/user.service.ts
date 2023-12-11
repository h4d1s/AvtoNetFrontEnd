import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { JwtService } from './jwt.service';
import { LoginResponseDTO } from '../DTOs/loginResponseDTO';
import { User } from '../models/user.model';
import { RegisterResponseDTO } from '../DTOs/registerResponseDTO.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "User";
  private userStorageId = "avtoNetUser";
  private userRolesStorageId = "avtoNetUserRoles";
  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) {
    const storedUserData = localStorage.getItem(this.userStorageId);
    if(storedUserData) {
      this.currentUserSubject.next(JSON.parse(storedUserData));
    }
  }

  isAuthenticated() {
    return !!this.jwtService.getToken();
  }

  getUser(): User {
    return this.currentUserSubject.getValue();
  }

  getUserRoles(): string[] {
    const storedUserRoles = localStorage.getItem(this.userRolesStorageId);
    if(storedUserRoles) {
      return JSON.parse(storedUserRoles);
    }
    return [];
  }

  getAll(params: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${this.url}`, { observe: 'response', params: params });
  }

  update(userId: string, userData: any): Observable<any> {
    return this.http
      .put(`${environment.apiUrl}/${this.url}/${userId}`, userData)
      .pipe(tap((response) => {
        const updatedUser = Object.assign({}, this.getUser(), userData);
        localStorage.setItem(this.userStorageId, JSON.stringify(updatedUser));

        this.currentUserSubject.next(updatedUser);
      }));
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.url}/${id}`);
  }

  login(credentials: {email: string, password: string }): Observable<object> {
    return this.http
      .post<LoginResponseDTO>(`${environment.apiUrl}/${this.url}/login`, credentials)
      .pipe(tap((response) => {
        this.jwtService.saveToken(response.token);
        localStorage.setItem(this.userStorageId, JSON.stringify(response.user));
        localStorage.setItem(this.userRolesStorageId, JSON.stringify(response.userRoles));

        this.currentUserSubject.next(response.user);
      }));
  }

  register(data: any) {
    return this.http
      .post<RegisterResponseDTO>(`${environment.apiUrl}/${this.url}/register`, data)
      .pipe(tap((response) => {
        this.jwtService.saveToken(response.token);
        localStorage.setItem(this.userStorageId, JSON.stringify(response.user));
        localStorage.setItem(this.userRolesStorageId, JSON.stringify(response.userRoles));

        this.currentUserSubject.next(response.user);
      }));
  }

  logout() {
    this.jwtService.destroyToken();
    localStorage.removeItem(this.userStorageId);
    localStorage.removeItem(this.userRolesStorageId);

    this.currentUserSubject.next(new User());
  }
}
