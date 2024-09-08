import { BaseEntity } from "@medusajs/medusa";
import { Product } from "@medusajs/medusa/dist/models/product";
import { OrderEstimate } from "./order-estimate";

export declare class OrderEstimateItem extends BaseEntity {
    product: Product;
    quantity: number;
    orderEstimate: OrderEstimate;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}
