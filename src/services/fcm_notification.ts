import { CustomerService, TransactionBaseService } from "@medusajs/medusa";
import { Reward } from "../models/reward";
import { MedusaError } from "@medusajs/utils";
import { RewardRepository } from "src/repositories/reward";
import AddressRepository from "src/repositories/address";
import { AppInfo } from "src/models/app-info";

class FCMNotificationService extends TransactionBaseService {
    protected customerService: CustomerService;

    constructor(container) {
        super(container);
        this.customerService = container.resolve("customerService");;
    }

    // Add FCM Token
    async addFCMToken(customer_id: string, fcm_token: string): Promise<boolean> {
        return this.atomicPhase_(async (manager) => {
            try {
                const customer = await this.customerService.retrieve(customer_id)
                if (customer) {
                    await this.customerService.update(customer.id, {
                        metadata: {
                            ...customer.metadata,
                            fcm_token: fcm_token,
                        }
                    })
                } else {
                    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Customer not found")
                }

                return true
            } catch (error) {
                throw error;                
            }
        })
    }

    // Get FCM Token
    async getFCMToken(customer_id: string): Promise<String> {
        return this.atomicPhase_(async (manager) => {
            try {
                const customer = await this.customerService.retrieve(customer_id);
                return customer.metadata?.fcm_token as string | undefined;
            } catch (error) {
                throw error;                
            }
        })
    }
}

export default FCMNotificationService;