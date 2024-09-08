// types/claimed-rewards.d.ts

import { ClaimStatus } from "../models/claimed-rewards";
import { Profile } from "./profile";
import { Reward } from "./reward";
import { UserPointsBalance } from "./user-points-balance";
import { BaseEntity } from "@medusajs/medusa";

export declare class ClaimedRewards extends BaseEntity {
  rewardId: string;
  points_used: number;
  profile: Profile;
  userPointsBalance: UserPointsBalance;
  status: ClaimStatus;
  claimed_at: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
