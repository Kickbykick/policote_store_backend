import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    BeforeInsert,
} from "typeorm";
import { Customer } from "./customer";
import { generateEntityId } from "@medusajs/medusa/dist/utils";
import { BaseEntity } from "@medusajs/medusa";
import { Profile } from "./profile";
  
export enum JOBROLE {
    FRONTDESK = "front_desk",
    PRESSER = "presser",
    TAILOR = "tailor",
    MANAGER = "manager",
    SUPERVISOR = "supervisor",
    ASSOCIATE = "associate",
    UTILITY = "utility",
    CLEANER = "cleaner",
}

export enum JOBTYPE {
    ONCALL = "on_call",
    CONTRACT = "contract",
    FULLTIME = "full_time",
    PARTTIME = "part_time",
}

@Entity()
export class StoreStaff extends BaseEntity{
    @OneToOne(() => Profile, (profile) => profile.storeStaff)
    profile: Profile;

    @Column({
        type: "enum",
        enum: JOBROLE,
        default: JOBROLE.UTILITY,
    })
    jobRole: JOBROLE;

    @Column({
        type: "enum",
        enum: JOBTYPE,
        default: JOBTYPE.ONCALL,
    })
    jobType: JOBTYPE;

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "strstf");
    }
}
  