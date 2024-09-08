import { BaseEntity } from "@medusajs/medusa";
import { Profile } from "./profile";
import { ClaimedRewards } from "./claimed-rewards";

export declare class UserPointsBalance extends BaseEntity {
    profile: Profile;
    claimed_rewards: ClaimedRewards[];
    total_points: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}
