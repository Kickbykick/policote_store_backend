import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { Driver } from "../models/driver";

export const DriverRepository = dataSource
  .getRepository(Driver)
  .extend({});

export default DriverRepository;
