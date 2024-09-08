import { ClaimedRewards } from "../models/claimed-rewards";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";

export const ClaimedRewardsRepository = dataSource
  .getRepository(ClaimedRewards)
  .extend({});

export default ClaimedRewardsRepository;
