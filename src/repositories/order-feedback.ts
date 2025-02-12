import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { OrderFeedback } from "../models/order-feedback";

export const OrderFeedbackRepository = dataSource
  .getRepository(OrderFeedback)
  .extend({});

export default OrderFeedbackRepository;
