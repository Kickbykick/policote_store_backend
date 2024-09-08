import { 
    dataSource,
} from "@medusajs/medusa/dist/loaders/database"
import { CartRepository as MedusaCartRepository } from "@medusajs/medusa/dist/repositories/cart"
import { Cart } from "../models/cart";

export const CartRepository = dataSource
.getRepository(Cart)
.extend({
    // it is important to spread the existing repository here.
    //  Otherwise you will end up losing core properties
    ...Object.assign(MedusaCartRepository, {
    target: Cart,
    }),
})

export default CartRepository