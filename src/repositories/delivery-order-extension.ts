import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { DeliveryOrderExtension } from "../models/delivery-order-extension";

export const DeliveryOrderExtensionRepository = dataSource
  .getRepository(DeliveryOrderExtension)
  .extend({
    async findById(id: string): Promise<DeliveryOrderExtension | null> {
      return this.findOne({ where: { id: id } });
    },
  });

export default DeliveryOrderExtensionRepository;
