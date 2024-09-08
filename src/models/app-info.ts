import { Entity, Column, BeforeInsert } from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/utils";

@Entity()
export class AppInfo extends BaseEntity {
  @Column()
  terms_conditions_url: string

  @Column()
  privacy_policy_url: string

  @Column()
  faq_page_url: string

  @Column()
  about_page_url: string

  @Column({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp with time zone", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "appInfo");
  }
}