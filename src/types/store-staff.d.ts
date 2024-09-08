import { BaseEntity } from "@medusajs/medusa";
import { Profile } from "./profile";
import { JOBROLE } from "../models/store-staff";
import { JOBTYPE } from "../models/store-staff";

export declare class StoreStaff extends BaseEntity {
    profile: Profile;
    jobRole: JOBROLE;
    jobType: JOBTYPE;
}