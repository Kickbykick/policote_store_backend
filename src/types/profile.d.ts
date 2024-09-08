import { BaseEntity } from "@medusajs/medusa";
import { Tailor } from "./tailor";
import { Driver } from "./driver";
import { Cleaner } from "./cleaner";
import { StoreStaff } from "./store-staff";
import { Customer } from "./customer";
import { UserPointsBalance } from "./user-points-balance";

export declare class Profile extends BaseEntity {
    isPartner: boolean;
    profileImage: string;
    referralCode: string;
    total_points: number;
    claimed_rewards: ClaimedRewards[];
    ratings: Rating[];
    tailor?: Tailor;
    driver?: Driver;
    cleaner?: Cleaner;
    storeStaff?: StoreStaff;
    customer: Customer;
    userPointsBalance: UserPointsBalance;
}
