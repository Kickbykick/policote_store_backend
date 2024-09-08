import {
    Entity,
    Column,
    Index,
    Relation,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
} from "typeorm";
import {
    Address,
    Cart as MedusaCart,
} from "@medusajs/medusa";
import { Rating } from "./rating";
import { DeliveryOrderExtension } from "./delivery-order-extension";

@Entity()
export class Cart extends MedusaCart  {
    @OneToOne(() => DeliveryOrderExtension, (deliveryOrder) => deliveryOrder.order, {onDelete: "CASCADE"})
    @JoinColumn({ name: "delivery_order_extension_id" })
    deliveryOrderExtension: DeliveryOrderExtension;
}