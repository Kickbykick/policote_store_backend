import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    BeforeInsert,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToMany,
} from "typeorm";
import { generateEntityId } from "@medusajs/utils";
import { BaseEntity } from "@medusajs/medusa";
import { Profile } from "./profile";
import { Rating } from "./rating";
import { DeliveryOrderExtension } from "./delivery-order-extension";

export enum ServiceProviderStatus {
    ACTIVE = "Active",
    INACTIVE = "Inactive",
}

export enum ServiceType {
    LAUNDRY = "Laundry",
    DRYCLEANING = "DryCleaning",
    TAILORING = "Tailoring",
    HOMECLEANING = "Home Cleaning",
    COMMERCIALCLEANING = "Commercial Cleaning",
}

@Entity()
export class ServiceProvider extends BaseEntity {
    @Column()
    name: string;
  
    @OneToOne(() => Profile, (profile) => profile.serviceProvider, { nullable: true })
    profile: Profile;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column({
        type: "enum",
        enum: ServiceType,
        default: ServiceType.DRYCLEANING,
    })
    type: ServiceType;

    @Column({
        type: "enum",
        enum: ServiceProviderStatus,
        default: ServiceProviderStatus.INACTIVE,
    })
    status: ServiceProviderStatus;

    @OneToMany(() => DeliveryOrderExtension, (deliveryOrderExtension) => deliveryOrderExtension.serviceProvider)
    delivery_order_extension: DeliveryOrderExtension[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "svcprvdr");
    }
}
  