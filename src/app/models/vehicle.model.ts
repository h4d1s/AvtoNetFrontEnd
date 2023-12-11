import { VehicleBrand } from "./vehicle-brand";
import { VehicleModel } from "./vehicle-model";

export class Vehicle {
    id: string = "";
    brand: VehicleBrand = new VehicleBrand();
    model: VehicleModel = new VehicleModel();
}