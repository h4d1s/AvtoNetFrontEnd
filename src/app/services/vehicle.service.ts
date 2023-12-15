import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private url = "Vehicle";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${environment.apiUrl}/${this.url}`);
  }

  get(id: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${environment.apiUrl}/${this.url}/${id}`);
  }
}
