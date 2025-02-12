import { TransactionBaseService } from "@medusajs/medusa";
import { Reward } from "../models/reward";
import { MedusaError } from "@medusajs/utils";
import { RewardRepository } from "src/repositories/reward";
import AddressRepository from "src/repositories/address";
import { AppInfo } from "src/models/app-info";
import AppInfoRepository from "src/repositories/app-info";
import ProfileRepository from "src/repositories/profile";
import { Profile } from "src/models/profile";
import UserPointsBalanceRepository from "src/repositories/user-points-balance";
import CustomerRepository from "src/repositories/customer";
import { UserPointsBalance } from "src/models/user-points-balance";

class UserPointsBalanceService extends TransactionBaseService {
    protected readonly profileRepository_: typeof ProfileRepository;
    protected readonly userPointsBalanceRepository_: typeof UserPointsBalanceRepository;
    protected readonly customerRepository_: typeof CustomerRepository;

    constructor({ profileRepository, userPointsBalanceRepository, customerRepository }) {
        super(arguments[0]);
        this.profileRepository_ = profileRepository;
        this.userPointsBalanceRepository_ = userPointsBalanceRepository;
        this.customerRepository_ = customerRepository
    }

    async getCustomerPointsAndRewards(customerId: string): Promise<Partial<UserPointsBalance>> {
        return await this.atomicPhase_(async (manager) => {
            // Step 1: Get the customer and the associated profile using the customer repository
            const customer = await this.customerRepository_.findOne({
                where: { id: customerId },
                relations: ["profile"],
            });

            if (!customer || !customer.profile) {
                throw new Error("Profile not found for this customer.");
            }

            const profile = customer.profile as Profile;

            // Step 2: Get the user points balance from the profile
            const userPointsBalance = await this.userPointsBalanceRepository_.findOne({
                where: { id: profile.userPointsBalance.id },
                relations: ["claimed_rewards"],
            });

            if (!userPointsBalance) {
                throw new Error("User points balance not found.");
            }

            // Step 3: Return the total points and the list of claimed rewards
            return {
                total_points: userPointsBalance.total_points,
                claimed_rewards: userPointsBalance.claimed_rewards,
            };
        });
    }
}

export default UserPointsBalanceService;