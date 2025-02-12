import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { ServiceProvider } from "../models/service-provider";

export const ServiceProviderRepository = dataSource
  .getRepository(ServiceProvider)
  .extend({
    async findById(id: string): Promise<ServiceProvider | null> {
      return this.findOne({ where: { id: id } });
    },
    async findAll(): Promise<ServiceProvider[]> {
      return this.find();
    },
  }
);

export default ServiceProviderRepository;
