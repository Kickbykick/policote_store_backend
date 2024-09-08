import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    BeforeInsert,
    UpdateDateColumn,
    DeleteDateColumn,
    CreateDateColumn,
} from "typeorm";
// import { Customer } from "./customer";
import { BaseEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/utils";
import { Profile } from "./profile";

export enum TailorStatus {
    ACTIVE = "Active",
    INACTIVE = "Inactive",
}

@Entity()
export class Tailor extends BaseEntity {
    @Column()
    name: string;
  
    @OneToOne(() => Profile, (profile) => profile.driver)
    profile: Profile;

    @Column()
    shop_name: string;

    @Column({ type: "int" })
    experience_years: number;

    @Column()
    specialties: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column({
        type: "enum",
        enum: TailorStatus,
        default: TailorStatus.INACTIVE,
    })
    status: TailorStatus;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "tlr");
    }
}
  