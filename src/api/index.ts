// // src/api/index.ts
// import { registerOverriddenValidators } from "@medusajs/medusa";
// import {
//    AdminPostCustomersReq as MedusaAdminPostCustomersReq,
// } from "@medusajs/medusa/dist/api/routes/admin/customers/create-customer";
// import {
//     StorePostCustomersReq as MedusaStorePostCustomersReq,
//  } from "@medusajs/medusa/dist/api/routes/store/customers/create-customer";
// import { IsString } from "class-validator";

// class AdminPostCustomersReq extends MedusaAdminPostCustomersReq {
//    @IsString()
//    username: string;
// }

// class StorePostCustomersReq extends MedusaStorePostCustomersReq {
//     @IsString()
//     username: string;
//  }

// registerOverriddenValidators(AdminPostCustomersReq);
// registerOverriddenValidators(StorePostCustomersReq);
