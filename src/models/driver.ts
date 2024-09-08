import {
    Entity,
    Column,
    OneToOne,
    BeforeInsert,
    DeleteDateColumn,
    UpdateDateColumn,
    CreateDateColumn,
} from "typeorm";
import { generateEntityId } from "@medusajs/utils";
import { BaseEntity } from "@medusajs/medusa";
import { Profile } from "./profile";

export enum DriverStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "InActive",
    ONDUTY = "On Duty",
}

@Entity()
export class Driver extends BaseEntity {
    @OneToOne(() => Profile, (profile) => profile.driver)
    profile: Profile;

    @Column()
    license_number: string;

    @Column()
    vehicle_model: string;

    @Column()
    vehicle_color: string;

    @Column()
    vehicle_plate: string;

    @Column({
        type: "enum",
        enum: DriverStatus,
        default: DriverStatus.INACTIVE,
    })
    status: DriverStatus;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "driver");
    }
}
  