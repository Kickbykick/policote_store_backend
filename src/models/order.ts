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
  Order as MedusaOrder,
} from "@medusajs/medusa";
import { Rating } from "./rating";
import { DeliveryOrderExtension } from "./delivery-order-extension";

@Entity()
export class Order extends MedusaOrder  {
  @OneToOne(() => DeliveryOrderExtension, deliveryOrderExtension => deliveryOrderExtension.cart, {onDelete: "CASCADE"})
  @JoinColumn({ name: "delivery_order_extension_id" })
  deliveryOrderExtension: DeliveryOrderExtension;
}