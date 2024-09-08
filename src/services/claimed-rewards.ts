import { TransactionBaseService } from "@medusajs/medusa";
import { MedusaError } from "@medusajs/utils";
import { RewardRepository } from "src/repositories/reward";
import UserPointsBalanceRepository from "src/repositories/user-points-balance";
import CustomerRepository from "src/repositories/customer";
import ClaimedRewardsRepository from "src/repositories/claimed-rewards";
import { ClaimedRewards, ClaimStatus } from "../models/claimed-rewards";
import { UserPointsBalance } from "src/models/user-points-balance";

class ClaimedRewardsService extends TransactionBaseService {
    protected readonly claimedRewardsRepository_: typeof ClaimedRewardsRepository;
    protected readonly userPointsBalanceRepository_: typeof UserPointsBalanceRepository;
    protected readonly customerRepository_: typeof CustomerRepository;
    protected readonly rewardRepository_: typeof RewardRepository;

    constructor({ claimedRewardsRepository, userPointsBalanceRepository, customerRepository, rewardRepository }) {
        super(arguments[0]);
        this.claimedRewardsRepository_ = claimedRewardsRepository;
        this.userPointsBalanceRepository_ = userPointsBalanceRepository;
        this.customerRepository_ = customerRepository;
        this.rewardRepository_ = rewardRepository;
    }

    async getClaimedRewardById(claimedRewardId: string): Promise<ClaimedRewards> {
        return await this.claimedRewardsRepository_.findOne({
            where: { id: claimedRewardId },
            relations: ["userPointsBalance"],
        });
    }

    async claimReward(customerId: string, rewardId: string): Promise<ClaimedRewards> {
        return await this.atomicPhase_(async (manager) => {
            const customer = await this.customerRepository_.findOne({
                where: { id: customerId },
                relations: ["profile", "profile.userPointsBalance"],
            });
    
            if (!customer || !customer.profile || !customer.profile.userPointsBalance) {
                throw new Error("Customer or user points balance not found.");
            }
    
            const userPointsBalance = customer.profile.userPointsBalance as UserPointsBalance;
    
            // Step 2: Get the reward by ID
            const reward = await this.rewardRepository_.findOne({
                where: { id: rewardId },
            });
    
            if (!reward) {
                throw new Error("Reward not found.");
            }
    
            // Step 3: Check if the customer has enough points
            if (userPointsBalance.total_points < reward.points_required) {
                throw new Error("Not enough points to claim this reward.");
            }
    
            // Step 4: Deduct points and create a claimed reward
            userPointsBalance.total_points -= reward.points_required;
            await this.userPointsBalanceRepository_.save(userPointsBalance);
    
            const claimedReward = this.claimedRewardsRepository_.create({
                rewardId: reward.id,
                points_used: reward.points_required,
                userPointsBalance,
                claimed_at: new Date(),
                status: ClaimStatus.REDEEMED,
            });
    
            return await this.claimedRewardsRepository_.save(claimedReward);
        });
    }
}

export default ClaimedRewardsService;