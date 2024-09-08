import { BaseEntity } from "@medusajs/medusa";
import { RewardSource } from "./Reward";

export declare class Reward extends BaseEntity {
  name: string;
  description: string;
  source: RewardSource;
  points_required: number;
  valid_until: Date | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
