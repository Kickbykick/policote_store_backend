import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { DeliveryOrderExtension } from "../models/delivery-order-extension";

export const DeliveryOrderExtensionRepository = dataSource
  .getRepository(DeliveryOrderExtension)
  .extend({});

export default DeliveryOrderExtensionRepository;
