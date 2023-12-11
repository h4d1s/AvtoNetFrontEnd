import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleModel } from '../models/vehicle-model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleModelService {

  private url = "VehicleModel";

  constructor(private http: HttpClient) { }

  getAllByBrand(brandId: number): Observable<VehicleModel[]> {
    return this.http.get<VehicleModel[]>(`${environment.apiUrl}/${this.url}/byBrand/${brandId}`);
  }

  get(id: number): Observable<VehicleModel> {
    return this.http.get<VehicleModel>(`${environment.apiUrl}/${this.url}/${id}`);
  }
}
