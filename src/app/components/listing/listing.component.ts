import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ListingDTO } from '../../DTOs/listingDTO.model';
import { ListingService } from '../../services/listing.service';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent implements OnInit {
  listing: ListingDTO = new ListingDTO();

  constructor(
    private route: ActivatedRoute,
    private listingService: ListingService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    const listingId = id ? id : "";
    this.listingService
      .get(listingId)
      .subscribe((data: ListingDTO) => this.listing = data);
  }

}
