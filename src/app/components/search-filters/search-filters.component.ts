import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleBrandService } from '../../services/vehicle-brand.service';
import { VehicleBrand } from '../../models/vehicle-brand';
import { FormsModule } from '@angular/forms';
import { VehicleModel } from '../../models/vehicle-model';
import { VehicleModelService } from '../../services/vehicle-model.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.scss'
})
export class SearchFiltersComponent implements OnInit {
  brands: VehicleBrand[] = [];
  models: VehicleModel[] = [];
  brandSelect: any;
  modelSelect: any;
  isModelSelectDisabled: boolean = true;

  constructor(
    private router: Router,
    private vehicleBrandService: VehicleBrandService,
    private vehicleModelService: VehicleModelService) {}

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands() {
    this.router
    this.vehicleBrandService
      .getAll()
      .subscribe((data: VehicleBrand[]) => this.brands = data);
  }

  onBrandSelectChange(e: Event) {
    const brandId = +(e.target as HTMLSelectElement).value;

    this.vehicleModelService
      .getAllByBrand(brandId)
      .subscribe((data: VehicleModel[]) => this.models = data);
    
    this.isModelSelectDisabled = false;
  }

  onSubmit(formData: any) {
    this.router.navigate(['/listings'], { queryParams: formData });
  }
}
