import { BaseEntity } from "@medusajs/medusa";
import { Customer } from "./customer";
import { ServiceProvider } from "./service-provider";
import { Order } from "./order";

export declare class Rating extends BaseEntity {
    order: Order;
    customer: Customer;
    serviceProvider: ServiceProvider;
    rating: number;
    review: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}
