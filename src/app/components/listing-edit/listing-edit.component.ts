import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListingService } from '../../services/listing.service';
import { ActivatedRoute } from '@angular/router';
import { ListingDTO } from '../../DTOs/listingDTO.model';

@Component({
  selector: 'app-listing-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './listing-edit.component.html',
  styleUrl: './listing-edit.component.scss'
})
export class ListingEditComponent implements OnInit {
  listingEditForm: FormGroup;
  @ViewChild('fileInput') fileInput: any;
  successfulMessage: string = "";
  errorMessage: string = "";
  currentId: string = "";
  imageFile: File | null = null;
  imageFilePath: string = "";
  listing: ListingDTO = new ListingDTO();

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private listingService: ListingService
  ) {
    this.listingEditForm = this.formBuilder.group({
      imageFile: [""],
      mileage: ["", [Validators.required]],
      fuelType: ["", [Validators.required]],
      gearbox: ["", [Validators.required]],
      yearOfProduction: ["", [Validators.required]],
      color: ["", [Validators.required]],
      price: ["", [Validators.required]],
      power: ["", [Validators.required]],
      engineSize: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id") ?? "";
    this.currentId = id;
    this.listingService.get(id).subscribe((listing) => {
      this.imageFilePath = listing.imagePath;
      this.listing = listing;
      this.listingEditForm.patchValue(listing);
    });
  }

  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if(files) {
      this.imageFilePath = "";
      this.imageFile = files[0];

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageFilePath = e.target.result;
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  onSubmit() {
    if(!this.listingEditForm.valid) {
      return;
    }
    const data = this.listingEditForm.value;
    const formData = new FormData();

    if(this.imageFile) {
      formData.append('imageFile', this.imageFile);
    }

    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    this.listingService.update(this.currentId, formData).subscribe({
      next: (d) => {
        this.successfulMessage = "Listing updated successfuly.";
      },
      error: (err) => {
        this.errorMessage = err.error;
      }
    });
  }
}
