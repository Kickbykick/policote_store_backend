// types/order.d.ts

import { Relation } from "typeorm";
import { Order as MedusaOrder, Address } from "@medusajs/medusa";
import { Rating } from "./ratings";

export declare class Order extends MedusaOrder {
  pickup_address_id: string | null;
  pickup_address: Relation<Address>;
  ratings: Rating[];
}
