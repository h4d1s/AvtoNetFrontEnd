import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VehicleBrand } from '../models/vehicle-brand';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleBrandService {

  private url = "VehicleBrand";

  constructor(private http: HttpClient) { }

  getAll(): Observable<VehicleBrand[]> {
    return this.http.get<VehicleBrand[]>(`${environment.apiUrl}/${this.url}`);
  }

  get(id: number) {
    return this.http.get<VehicleBrand>(`${environment.apiUrl}/${this.url}/${id}`);
  }
}
