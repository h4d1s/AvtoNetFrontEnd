import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingDTO } from '../../DTOs/listingDTO.model';
import { ListingService } from '../../services/listing.service';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PaginationComponent } from '../../layout/pagination/pagination.component';
import { Filter } from '../../models/filter.model';
import { VehicleBrandService } from '../../services/vehicle-brand.service';
import { VehicleModelService } from '../../services/vehicle-model.service';
import { SpinnerComponent } from '../../layout/spinner/spinner.component';

@Component({
  selector: 'app-listing-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    PaginationComponent,
    SpinnerComponent
  ],
  templateUrl: './listing-list.component.html',
  styleUrl: './listing-list.component.scss'
})
export class ListingListComponent implements OnInit {
  filters: Filter = new Filter();
  brandName: string | null = null;
  modelName: string | null = null;
  filterValues = Object.entries(this.filters);
  listings: ListingDTO[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private listingService: ListingService,
    private vehicleBrandService: VehicleBrandService,
    private vehicleModelService: VehicleModelService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(data => {
      this.filters = Object.assign({}, this.filters, data);
      if(this.filters.brandId != null) {
        this.vehicleBrandService.get(this.filters.brandId).subscribe((brand) => {
          this.brandName = brand.name;
        });
      }
      if(this.filters.modelId != null) {
        this.vehicleModelService.get(this.filters.modelId).subscribe((model) => {
          this.modelName = model.name;
        });
      }
      this.fetchData(data);
    });
  }

  fetchData(filterData: any) {
    this.isLoading = true;
    this.listingService
    .getAll(filterData)
    .subscribe((response: HttpResponse<any>) => {
      this.listings = response.body;

      const headers = response.headers;
      const paginationHeader = headers.get('X-Pagination');
      var paginationInfo = JSON.parse(paginationHeader || '{}');
      this.currentPage = paginationInfo.CurrentPage;
      this.itemsPerPage = paginationInfo.PageSize;
      this.totalItems = paginationInfo.TotalCount;
      this.totalPages = paginationInfo.TotalPages;

      this.isLoading = false;
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.filters.page = page;

    this.router.navigate(["."], {
      relativeTo: this.activatedRoute,
      queryParams: this.filters,
      queryParamsHandling: 'merge',
    });
  }

  removeFilter() {
    this.router.navigate(["."], {
      relativeTo: this.activatedRoute,
      queryParams: this.filters,
      queryParamsHandling: 'merge',
    });
  }
}
