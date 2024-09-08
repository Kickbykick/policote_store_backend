import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { OrderEstimateItem } from "../models/order-estimate-item";

export const OrderEstimateItemRepository = dataSource
  .getRepository(OrderEstimateItem)
  .extend({});

export default OrderEstimateItemRepository;
