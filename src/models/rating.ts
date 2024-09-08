import {
    Entity,
    Column,
    BeforeInsert,
    ManyToOne,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from "typeorm";
import { Customer } from "./customer";
import { generateEntityId } from "@medusajs/utils";
import { BaseEntity } from "@medusajs/medusa";
import { ServiceProvider } from "./service-provider";
import { Order } from "./order";
import { Profile } from "./profile";
import { DeliveryOrderExtension } from "./delivery-order-extension";

@Entity()
export class Rating extends BaseEntity {
    @ManyToOne(() => Profile, (profile) => profile.ratings)
    @JoinColumn({ name: "profile_id" })
    profile: Profile;

    @ManyToOne(() => DeliveryOrderExtension, (deliveryOrderExtension) => deliveryOrderExtension.ratings)
    @JoinColumn({ name: "delivery_order_extension_id" })
    delivery_order_extension: DeliveryOrderExtension;

    @Column({ type: "int" })
    rating: number;

    @Column({ type: "text" })
    review: string;

    @CreateDateColumn()
    created_at: Date;
 
    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "rating");
    }
}
  