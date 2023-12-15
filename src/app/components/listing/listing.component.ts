import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ListingDTO } from '../../DTOs/listingDTO.model';
import { ListingService } from '../../services/listing.service';
import { SpinnerComponent } from '../../layout/spinner/spinner.component';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent
  ],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent implements OnInit {
  listing: ListingDTO = new ListingDTO();
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    const listingId = id ? id : "";
    this.isLoading = true;

    this.listingService
      .get(listingId)
      .subscribe((data: ListingDTO) => {
        this.listing = data;
        this.isLoading = false;
      });
  }
}
