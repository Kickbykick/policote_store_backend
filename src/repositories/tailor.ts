import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { Tailor } from "../models/tailor";

export const TailorRepository = dataSource
  .getRepository(Tailor)
  .extend({});

export default TailorRepository;
