import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    BeforeInsert,
    JoinColumn,
    OneToMany,
} from "typeorm";
import { Customer } from "./customer";
import { generateEntityId } from "@medusajs/utils";
import { BaseEntity, Product } from "@medusajs/medusa";
import { Tailor } from "./tailor";
import { Driver } from "./driver";
import { UserPointsBalance } from "./user-points-balance";
import { OrderEstimateItem } from "./order-estimate-item";

@Entity()
export class OrderEstimate extends BaseEntity {
    @Column()
    total: number

    @OneToOne(() => Customer, (customer) => customer.orderEstimate)
    customer: Customer;

    @OneToMany(() => OrderEstimateItem, (orderEstimateItem) => orderEstimateItem.orderEstimate, { cascade: true })
    orderEstimateItem: OrderEstimateItem[]

    @Column({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @Column({ type: "timestamp with time zone", nullable: true })
    deleted_at: Date | null;
    
    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "oestmt");
    }
}
  