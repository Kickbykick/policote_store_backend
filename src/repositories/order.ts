import { 
    dataSource,
} from "@medusajs/medusa/dist/loaders/database"
import { OrderRepository as MedusaOrderRepository } from "@medusajs/medusa/dist/repositories/order"
import { Order } from "../models/order";

export const OrderRepository = dataSource
.getRepository(Order)
.extend({
    // it is important to spread the existing repository here.
    //  Otherwise you will end up losing core properties
    ...Object.assign(MedusaOrderRepository, {
        target: Order,
    }),
})

export default OrderRepository