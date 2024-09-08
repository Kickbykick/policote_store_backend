import { BaseEntity } from "@medusajs/medusa";
import { Product } from "@medusajs/medusa/dist/models/product";
import { Customer } from "./customer";
import { OrderEstimateItem } from "./order-estimate-item";

export declare class OrderEstimate extends BaseEntity {
    product: Product;
    total: number;
    customer: Customer;
    orderEstimateItem: OrderEstimateItem[];
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}
