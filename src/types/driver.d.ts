// types/driver.d.ts

import { DriverStatus } from "../models/driver";
import { Profile } from "./profile";
import { BaseEntity } from "@medusajs/medusa";

export declare class Driver extends BaseEntity {
    profile: Profile;
    license_number: string;
    vehicle_model: string;
    vehicle_color: string;
    vehicle_plate: string;
    status: DriverStatus;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}
