import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';
import { ListingDTO } from '../DTOs/listingDTO.model';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  private url = "Listings";

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  getAll(params: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${this.url}`, { observe: 'response', params: params });
  }

  get(id: string): Observable<ListingDTO> {
    return this.http.get<ListingDTO>(`${environment.apiUrl}/${this.url}/${id}`);
  }

  create(data: FormData): Observable<any> {
    data.append("userId", this.userService.getUser().id);
    return this.http.post(`${environment.apiUrl}/${this.url}`, data);
  }

  update(id: string, data: FormData): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${this.url}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${this.url}/${id}`);
  }
}