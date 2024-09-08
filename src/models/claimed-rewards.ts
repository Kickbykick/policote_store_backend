import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity, Customer, User } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/utils";
import { Reward } from "./reward";
import { Profile } from "./profile";
import { UserPointsBalance } from "./user-points-balance";

export enum ClaimStatus {
  PENDING = "pending",
  REDEEMED = "redeemed",
  EXPIRED = "expired",
}

@Entity()
export class ClaimedRewards extends BaseEntity {
  @Column({ name: "reward_id" })
  rewardId: string;

  @Column({ type: "int" })
  points_used: number;

  @ManyToOne(() => UserPointsBalance, (userPointsBalance) => userPointsBalance.claimed_rewards)
  @JoinColumn({ name: "user_points_balance_id" })
  userPointsBalance: UserPointsBalance

  @Column({
    type: "enum",
    enum: ClaimStatus,
    default: ClaimStatus.PENDING,
  })
  status: ClaimStatus;

  @Column({ type: "timestamp with time zone" })
  claimed_at: Date;

  @Column({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @Column({ type: "timestamp with time zone", nullable: true })
  deleted_at: Date | null;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "clmrwd");
  }
}