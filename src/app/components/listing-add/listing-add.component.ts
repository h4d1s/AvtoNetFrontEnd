import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehicleBrandService } from '../../services/vehicle-brand.service';
import { VehicleBrand } from '../../models/vehicle-brand';
import { VehicleModelService } from '../../services/vehicle-model.service';
import { VehicleModel } from '../../models/vehicle-model';
import { ListingService } from '../../services/listing.service';

@Component({
  selector: 'app-listing-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './listing-add.component.html',
  styleUrl: './listing-add.component.scss'
})
export class ListingAddComponent implements OnInit {
  listingAddForm: FormGroup;
  brands: VehicleBrand[] = [];
  models: VehicleModel[] = [];
  successfulMessage: string = "";
  errorMessage: string = "";
  imageFile: File | null = null;
  imageFilePath: string = "";
  @ViewChild("fileInput") fileInputRef: ElementRef | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private listingService: ListingService,
    private vehicleBrandService: VehicleBrandService,
    private vehicleModelService: VehicleModelService
  ) {
    this.listingAddForm = this.formBuilder.group({
      imageFile: ["", Validators.required],
      brandId: ["", [Validators.required]],
      modelId: new FormControl({value: "", disabled: true}, Validators.required),
      mileage: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(0)]],
      fuelType: ["", [Validators.required]],
      gearbox: ["", [Validators.required]],
      yearOfProduction: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1950), Validators.max(new Date().getFullYear())]],
      color: ["", [Validators.required]],
      price: ["", [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
      power: ["", [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
      engineSize: ["", [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
    });
  }

  ngOnInit(): void {
    this.vehicleBrandService.getAll().subscribe((brands) => {
      this.brands = brands;
    });
  }

  onBrandSelectChange(e: Event) {
    const brandId = +(e.target as HTMLSelectElement).value;

    this.vehicleModelService
      .getAllByBrand(brandId)
      .subscribe((data) => {
        this.models = data;
        this.listingAddForm.get('modelId')?.enable();
      });
  }

  removeImage() {
    if(this.fileInputRef) {
      const fileInput = this.fileInputRef.nativeElement as HTMLInputElement;
      fileInput.value = "";
    }
    
    this.imageFilePath = "";
    this.listingAddForm.get('image')?.patchValue(this.imageFilePath);
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

  get formControls() {
    return this.listingAddForm.controls;
  }

  onSubmit() {
    if(!this.listingAddForm.valid) {
      return;
    }

    const formData = new FormData();
    const data = this.listingAddForm.value;

    if(this.imageFile) {
      formData.append('imageFile', this.imageFile);
    }

    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    this.listingService.create(formData).subscribe({
      next: (data) => {
        this.imageFilePath = "";
        this.clearForm();
        this.successfulMessage = "Listing successfuly created.";
      },
      error: (err) => {
        this.errorMessage = err.error;
      }
    });
  }

  clearForm() {
    this.listingAddForm.patchValue({
      imageFile: "",
      brandId: "",
      modelId: "",
      mileage: "",
      fuelType: "",
      gearbox: "",
      yearOfProduction: "",
      color: "",
      price: "",
      power: "",
      engineSize: "",
    });
  }
}
