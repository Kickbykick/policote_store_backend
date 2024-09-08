import {
    Entity,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    PrimaryGeneratedColumn,
    BeforeInsert
} from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { Customer } from "./customer";
import { Order } from "./order";
import { generateEntityId } from "@medusajs/utils";
import { DeliveryOrderExtension } from "./delivery-order-extension";

export enum IssueType {
    DELIVERY = "About Delivery",
    QUALITY = "About Quality",
    CUSTOMER_SERVICE = "Customer Service",
    OTHER = "Other"
}

@Entity()
export class OrderFeedback extends BaseEntity {
    @ManyToOne(() => Customer, { nullable: false })
    @JoinColumn({ name: "customer_id" })
    customer: Customer;

    @ManyToOne(() => DeliveryOrderExtension, { nullable: false })
    @JoinColumn({ name: "delivery_order_extension_id" })
    delivery_order_extension: DeliveryOrderExtension;

    @Column({ type: "enum", enum: IssueType })
    issue_type: IssueType;

    @Column({ type: "text" })
    description: string;

    @Column("text", { array: true, nullable: true })
    attachment_url: string[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "ord-fdbck");
    }
}
