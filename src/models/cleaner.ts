import {
    Entity,
    Column,
    OneToOne,
    BeforeInsert,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from "typeorm";
import { generateEntityId } from "@medusajs/utils";
import { BaseEntity } from "@medusajs/medusa";
import { Profile } from "./profile";

@Entity()
export class Cleaner extends BaseEntity  {
    @OneToOne(() => Profile, (profile) => profile.cleaner)
    profile: Profile;

    @Column({ default: false })
    isHomeCleaner: boolean;

    @Column({ default: false })
    isCommercialCleaner: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "clnr");
    }
}
  