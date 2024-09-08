import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { UserPointsBalance } from "../models/user-points-balance";

export const UserPointsBalanceRepository = dataSource
  .getRepository(UserPointsBalance)
  .extend({});

export default UserPointsBalanceRepository;
