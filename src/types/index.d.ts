// import { Profile } from "../models/profile";
// import { Rating } from "../models/rating";
// import { OrderEstimate } from "../models/order-estimate";
// import { Relation } from "typeorm";
// import { Address } from "@medusajs/medusa";

// export declare module "@medusajs/medusa/dist/models/customer" {
//     declare interface Customer {
//         profile: Profile;
//         order: OrderEstimate;
//     }
// }

// export declare module "@medusajs/medusa/dist/models/order" {
//     declare interface Order {
//         pickup_address_id: string | null;
//         pickup_address: Relation<Address>;
//         ratings: Rating[];
//     }
// }

// export declare module "@medusajs/medusa/dist/models/address" {
//     declare interface Address {
//         latitude: string | null;
//         longitude: string | null;
//     }
// }