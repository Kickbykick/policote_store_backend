import { TransactionBaseService } from "@medusajs/medusa";
import { Reward } from "../models/reward";
import { MedusaError } from "@medusajs/utils";
import { RewardRepository } from "src/repositories/reward";
import AddressRepository from "src/repositories/address";
import { AppInfo } from "src/models/app-info";
import AppInfoRepository from "src/repositories/app_info";
import ProfileRepository from "src/repositories/profile";
import { Profile } from "src/models/profile";
import UserPointsBalanceRepository from "src/repositories/user-points-balance";
import CustomerRepository from "src/repositories/customer";
import { Customer } from "src/models/customer";

class ProfileService extends TransactionBaseService {
    protected readonly profileRepository_: typeof ProfileRepository;
    protected readonly userPointsBalanceRepository_: typeof UserPointsBalanceRepository;
    protected readonly customerRepository_: typeof CustomerRepository;

    constructor({ profileRepository, userPointsBalanceRepository, customerRepository }) {
        super(arguments[0]);
        this.profileRepository_ = profileRepository;
        this.userPointsBalanceRepository_ = userPointsBalanceRepository;
        this.customerRepository_ = customerRepository
    }

    // async getReferralCode(customerId: string): Promise<string> {
    //     const profile = await this.profileRepository_.findOne({ where: { customer_id: customerId } })
    //     if (!profile) throw new Error("Profile not found")
    //     return profile.referral_code
    // }

    generateReferralCode(customerId: string): string {
        return `REF-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${customerId.slice(-6).toUpperCase()}`;
    }

    async createProfileFromCustomerId(customerId: string): Promise<Profile> {
        return await this.atomicPhase_(async (manager) => {
            const customerRepo = manager.withRepository(this.customerRepository_);
            const customer = await customerRepo.findOne({where: {
                id: customerId,
            }});

            return await this.createProfileForCustomer(customer);
        });
    }

    async createProfileForCustomer(customer: Customer): Promise<Profile> {
        return await this.atomicPhase_(async (manager) => {
            const profileRepo = manager.withRepository(this.profileRepository_);
            const userPointsBalanceRepo = manager.withRepository(this.userPointsBalanceRepository_);
            
            const userPointsBalance = userPointsBalanceRepo.create({
                claimed_rewards: [],
                total_points: 0,
            })
            const savedUserPointBalance = await userPointsBalanceRepo.save(userPointsBalance)

            const profile = profileRepo.create({
                ratings: [],
                customer: customer,
                referralCode: this.generateReferralCode(customer.id),
                userPointsBalance: savedUserPointBalance,
            })
            const savedProfile = await profileRepo.save(profile)

            // // Update User Point Balance
            // const newUserPoints = await userPointsBalanceRepo.findOne({where: {
            //     id: savedUserPointBalance.id,
            // }});
            // await userPointsBalanceRepo.save({...newUserPoints, savedProfile})

            return savedProfile
        });
    }
}

export default ProfileService;