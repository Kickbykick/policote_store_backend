import { TransactionBaseService } from "@medusajs/medusa";
import { Reward } from "../models/reward";
import { MedusaError } from "@medusajs/utils";
import { RewardRepository } from "src/repositories/reward";

class RewardService extends TransactionBaseService {
  protected readonly rewardRepository_: typeof RewardRepository;

  constructor({ rewardRepository }) {
    super(arguments[0]);
    this.rewardRepository_ = rewardRepository;
  }

  async create(data: Partial<Reward>): Promise<Reward> {
    return await this.atomicPhase_(async (manager) => {
      const rewardRepo = manager.withRepository(this.rewardRepository_);
      const reward = rewardRepo.create(data);
      return await rewardRepo.save(reward);
    });
  }

  async retrieve(rewardId: string): Promise<Reward> {
    const reward = await this.rewardRepository_.findById(rewardId);
    if (!reward) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Reward with id: ${rewardId} was not found`
      );
    }
    return reward;
  }

  async list(): Promise<Reward[]> {
    return await this.rewardRepository_.findAll();
  }

  async update(rewardId: string, data: Partial<Reward>): Promise<Reward> {
    return await this.atomicPhase_(async (manager) => {
      const rewardRepo = manager.withRepository(this.rewardRepository_);
      const reward = await this.retrieve(rewardId);
      
      console.log("Update Reward Service")
      for (const [key, value] of Object.entries(data)) {
        if (value !== undefined) {
          reward[key] = value;
        }
      }

      return await rewardRepo.save(reward);
    });
  }

  async delete(rewardId: string): Promise<void> {
    return await this.atomicPhase_(async (manager) => {
      const rewardRepo = manager.withRepository(this.rewardRepository_);
      const reward = await this.retrieve(rewardId);
      await rewardRepo.remove(reward);
    });
  }
}

export default RewardService;