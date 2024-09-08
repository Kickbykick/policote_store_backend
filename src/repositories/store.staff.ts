import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { StoreStaff } from "../models/store-staff";

export const StoreStaffRepository = dataSource
  .getRepository(StoreStaff)
  .extend({});

export default StoreStaffRepository;
