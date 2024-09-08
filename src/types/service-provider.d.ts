import { BaseEntity } from "@medusajs/medusa";
import { Profile } from "./profile";
import { Rating } from "./rating";
import { ServiceType } from "../models/service-provider";
import { ServiceProviderStatus } from "../models/service-provider";

export declare class ServiceProvider extends BaseEntity {
    name: string;
    profile: Profile;
    address: string;
    phone: string;
    type: ServiceType;
    status: ServiceProviderStatus;
    ratings: Rating[];
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}
