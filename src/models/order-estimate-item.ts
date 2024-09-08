import {
    Entity,
    Column,
    BeforeInsert,
    ManyToOne,
} from "typeorm";
import { generateEntityId } from "@medusajs/utils";
import { BaseEntity } from "@medusajs/medusa";
import { OrderEstimate } from "./order-estimate";

@Entity()
export class OrderEstimateItem extends BaseEntity {
    @Column()
    line_item_id: string;

    @Column()
    quantity: number

    @ManyToOne(() => OrderEstimate, (orderEstimate) => orderEstimate.orderEstimateItem)
    orderEstimate: OrderEstimate

    @Column({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @Column({ type: "timestamp with time zone", nullable: true })
    deleted_at: Date | null;
    
    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "oestmtitm");
    }
}
  