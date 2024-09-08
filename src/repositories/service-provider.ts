import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { ServiceProvider } from "../models/service-provider";

export const ServiceProviderRepository = dataSource
  .getRepository(ServiceProvider)
  .extend({});

export default ServiceProviderRepository;
