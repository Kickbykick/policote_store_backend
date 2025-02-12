import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { Reward } from "../models/reward";

export const RewardRepository = dataSource
  .getRepository(Reward)
  .extend(
  {
    async findById(id: string): Promise<Reward | null> {
      return this.findOne({ where: { id: id } });
    },

    async findAll(): Promise<Reward[]> {
      return this.find();
    },
  }
)
;

export default RewardRepository;