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
import { BaseEntity } from "@medusajs/medusa";
import { Tailor } from "./tailor";
import { Driver } from "./driver";
import { UserPointsBalance } from "./user-points-balance";
import { Cleaner } from "./cleaner";
import { StoreStaff } from "./store-staff";
import { ServiceProvider } from "./service-provider";
import { Rating } from "./rating";
import { ClaimedRewards } from "./claimed-rewards";

@Entity()
export class Profile extends BaseEntity {
    @Column({ name: 'is_partner', default: false })
    isPartner: boolean;

    @Column({ name: 'profile_image', nullable: true })
    profileImage: string;

    @Column({ name: 'referral_code' })
    referralCode: string;

    @OneToMany(() => Rating, (rating) => rating.profile, {onDelete: "CASCADE", nullable: true})
    ratings: Rating[];

    @OneToOne(() => ServiceProvider, (serviceProvider) => serviceProvider.profile, { nullable: true })
    @JoinColumn({ name: "service_provider_id" })
    serviceProvider: ServiceProvider;
  
    @OneToOne(() => Tailor, (tailor) => tailor.profile, { nullable: true })
    @JoinColumn({ name: "tailor_id" })
    tailor: Tailor;
  
    @OneToOne(() => Driver, (driver) => driver.profile, { nullable: true })
    @JoinColumn({ name: "driver_id" })
    driver: Driver;

    @OneToOne(() => Cleaner, (cleaner) => cleaner.profile, { nullable: true })
    @JoinColumn({ name: "cleaner_id" })
    cleaner: Cleaner;

    @OneToOne(() => StoreStaff, (storeStaff) => storeStaff.profile, { nullable: true })
    @JoinColumn({ name: "store_staff_id" })
    storeStaff: StoreStaff;
  
    @OneToOne(() => Customer, (customer) => customer.profile)
    customer: Customer;

    @OneToOne(() => UserPointsBalance, (userPointsBalance) => userPointsBalance.profile, {
        cascade: true, // Ensure changes are cascaded
        eager: true,   // Automatically load related entity
    })
    @JoinColumn({ name: "user_points_balance_id" })
    userPointsBalance: UserPointsBalance;

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "prfl");
    }
}
  