import { 
    dataSource,
} from "@medusajs/medusa/dist/loaders/database"
import { OrderRepository as MedusaOrderRepository } from "@medusajs/medusa/dist/repositories/order"
import { Order } from "../models/order";

export const OrderRepository = dataSource
.getRepository(Order)
.extend(Object.assign(MedusaOrderRepository, {
    target: Order,
}))

export default OrderRepository