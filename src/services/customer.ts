import { TransactionBaseService, CustomerService as MedusaCustomerService } from "@medusajs/medusa";
import { Customer } from "../models/customer";
import { MedusaError } from "@medusajs/utils";
import { CustomerRepository } from "../repositories/customer";
import { Profile } from "../models/profile";
import ProfileService from "./profile";
import ClaimedRewardsService from "./claimed-rewards";

class CustomerService extends MedusaCustomerService {
    protected readonly customerRepository_: typeof CustomerRepository;

    constructor({ customerRepository }) {
        super(arguments[0]);
        this.customerRepository_ = customerRepository;
    }

    async register(
        email: string,
        password: string,
        first_name: string,
        last_name: string,
        phoneNumber: string,
        referralCode: string,
        profileService: ProfileService,
        claimedRewardsService: ClaimedRewardsService,
    ): Promise<{ customer: Customer, referralClaimed: boolean }> {
        if (!email || !password || !first_name || !last_name || !phoneNumber) {
            throw new MedusaError(
                MedusaError.Types.INVALID_DATA,
                "All fields are required"
            );
        }

        const existing = await this.retrieveRegisteredByEmail(email)
            .catch(() => undefined);
        if (existing) {
            throw new MedusaError(
                MedusaError.Types.DUPLICATE_ERROR,
                "Email already exists"
            );
        }

        const existingByPhone = await this.retrieveByPhone(phoneNumber)
            .catch(() => undefined);
        if (existingByPhone) {
            throw new MedusaError(
                MedusaError.Types.DUPLICATE_ERROR,
                "Phone Number already exists"
            );
        }

        const hashedPassword = await super.hashPassword_(password);
        const customer = await super.create({
            email: email,
            password: password,
            password_hash: hashedPassword,
            phone: phoneNumber,
            first_name: first_name,
            last_name: last_name,
            has_account: true
        });
        console.log("customer", customer);
        console.log("customer.id", customer.id);

        const profile = await profileService.createProfileFromCustomerId(customer.id)
        console.log("profile", profile);

        let referralClaimed = false;
        if (referralCode) {
            try {
                await claimedRewardsService.claimReferralReward(customer.id, referralCode)
                referralClaimed = true
            } catch (error) {
                referralClaimed = false
            }
        }    

        // Retrieve fresh customer data with all relations
        const freshCustomer = await this.customerRepository_.findOne({
            where: { id: customer.id },
            relations: ['profile', 'profile.userPointsBalance']
        });
        console.log("freshCustomer", freshCustomer);
        
        return {
            customer: freshCustomer,
            referralClaimed
        }
    }

    async changePassword(id: string, password: string): Promise<boolean> {        
        try {
            const customer = await super.retrieve(id);
            if (!customer) {
                throw new MedusaError(MedusaError.Types.NOT_FOUND, "Customer not found");
            }

            await super.update(customer.id, {
                password: password
            });
            return true
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getProfile(customerId: string): Promise<Profile> {
        try {
            const customer = await this.customerRepository_.findOne({
                where: { id: customerId },
                relations: ['profile']
            });

            if (!customer?.profile) {
                throw new MedusaError(
                MedusaError.Types.NOT_FOUND,
                `Profile for customer with ID ${customerId} not found`
                );
            }

            return customer.profile;
        } catch (error) {
            throw new MedusaError(
                MedusaError.Types.NOT_FOUND,
                `Customer with ID ${customerId} not found`
            );
        }
    }
}

export default CustomerService;
