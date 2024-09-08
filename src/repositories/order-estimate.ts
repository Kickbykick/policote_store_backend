import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { OrderEstimate } from "../models/order-estimate";

export const OrderEstimateRepository = dataSource
  .getRepository(OrderEstimate)
  .extend({});

export default OrderEstimateRepository;
