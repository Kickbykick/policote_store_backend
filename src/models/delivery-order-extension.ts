import { Entity, Column, OneToOne, JoinColumn, BeforeInsert, UpdateDateColumn, CreateDateColumn, Relation, ManyToOne, OneToMany, Index } from "typeorm"
import { Address, BaseEntity, } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/utils";
import { Rating } from "./rating";
import { Cart } from "./cart";
import { Order } from "./order";
import { ServiceProvider } from "./service-provider";
import { OrderFeedback } from "./order-feedback";

export enum ORDER_STATUS {
  PENDING = "pending",
  ORDER_CONFIRMED = "order_confirmed",
  DRIVER_PICKUP_TRANSIT = "driver_pickup_transit",
  PROCESSING = "processing",
  CLEANING = "cleaning",
  READY = "ready",
  DELIVERY_TRANSIT = "delivery_transit",
  DELIVERED = "delivered",
}

@Entity()
export class DeliveryOrderExtension extends BaseEntity {
  @OneToOne(() => Order, (order) => order.deliveryOrderExtension)
  @JoinColumn({ name: "order_id" })
  order: Order

  @OneToOne(() => Cart, (cart) => cart.deliveryOrderExtension)
  @JoinColumn({ name: "cart_id" })
  cart: Cart

  @Index()
  @Column({ nullable: true })
  pickup_address_id: string | null;

  @ManyToOne(() => Address, { cascade: ["insert"] })
  @JoinColumn({ name: "pickup_address_id" })
  pickup_address: Relation<Address>;

  @ManyToOne(() => ServiceProvider, (serviceProvider) => serviceProvider.delivery_order_extension)
  @JoinColumn({ name: "service_provider_id" })
  serviceProvider: ServiceProvider;

  @OneToMany(() => Rating, (rating) => rating.delivery_order_extension, {onDelete: "CASCADE"})
  ratings: Rating[];

  @OneToMany(() => OrderFeedback, (order_feedback) => order_feedback.delivery_order_extension, {onDelete: "CASCADE"})
  order_feedback: OrderFeedback[];

  @Column({
    type: "enum",
    enum: ORDER_STATUS,
    default: ORDER_STATUS.PENDING,
  })
  order_status: ORDER_STATUS;

  @Column({ type: "timestamp with time zone" })
  pickup_at: Date

  @Column({ type: "timestamp with time zone" })
  delivery_at: Date

  @Column("jsonb", {nullable: true})
  garment_instructions: {
    image_url?: string
    description: string
  }[]

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "doe");
  }
}