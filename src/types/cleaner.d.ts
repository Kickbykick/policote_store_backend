// types/cleaner.d.ts

import { CleanerSkill } from "../models/cleaner";
import { Profile } from "./profile";
import { BaseEntity } from "@medusajs/medusa";

export declare class Cleaner extends BaseEntity {
    profile: Profile;
    isHomeCleaner: boolean;
    isCommercialCleaner: boolean;
}
