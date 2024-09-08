import { BaseEntity } from "@medusajs/medusa";
import { Profile } from "./profile";
import { TailorStatus } from "../models/tailor";

export declare class Tailor extends BaseEntity {
    name: string;
    profile: Profile;
    shop_name: string;
    experience_years: number;
    specialties: string;
    address: string;
    phone: string;
    status: TailorStatus;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}
