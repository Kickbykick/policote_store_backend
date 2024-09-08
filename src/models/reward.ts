import { BeforeInsert, Column, Entity } from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/utils";

export enum RewardSource {
  ORDER = "order",
  REFERRAL = "referral",
  PROMOTION = "promotion",
  OTHER = "other",
}

@Entity()
export class Reward extends BaseEntity {
  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({
    type: "enum",
    enum: RewardSource,
    default: RewardSource.ORDER,
  })
  source: RewardSource;

  @Column({ type: "int" })
  points_required: number;

  @Column({ type: "timestamp", nullable: true })
  valid_until: Date;

  @Column({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @Column({ type: "timestamp with time zone", nullable: true })
  deleted_at: Date | null;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "rwd");
  }
}

/**
 * @schema Reward
 * title: "Reward"
 * description: "A reward model."
 * type: object
 * required:
 *   - created_at
 *   - id
 *   - updated_at
 *   created_at:
 *     description: The date with timezone at which the resource was created.
 *     type: string
 *     format: date-time
 *   updated_at:
 *     description: The date with timezone at which the resource was updated.
 *     type: string
 *     format: date-time
 */
