import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { Profile } from "../models/profile";

export const ProfileRepository = dataSource
  .getRepository(Profile)
  .extend({});

export default ProfileRepository;