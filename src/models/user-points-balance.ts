import { BeforeInsert, Column, Entity, OneToOne, OneToMany } from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/utils";
import { Profile } from "./profile";
import { ClaimedRewards } from "./claimed-rewards";

@Entity()
export class UserPointsBalance extends BaseEntity {
  @OneToOne(() => Profile, (profile) => profile.userPointsBalance)
  profile: Profile;

  @OneToMany(() => ClaimedRewards, (claimedReward) => claimedReward.userPointsBalance)
  claimed_rewards: ClaimedRewards[]

  @Column({ type: "int" })
  total_points: number;

  @Column({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @Column({ type: "timestamp with time zone", nullable: true })
  deleted_at: Date | null;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "usrpts");
  }
}
