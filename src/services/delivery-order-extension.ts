import { TransactionBaseService } from "@medusajs/medusa";
import { MedusaError } from "@medusajs/utils";
import { RewardRepository } from "src/repositories/reward";
import UserPointsBalanceRepository from "src/repositories/user-points-balance";
import CustomerRepository from "src/repositories/customer";
import ClaimedRewardsRepository from "src/repositories/claimed-rewards";
import { ClaimedRewards, ClaimStatus } from "../models/claimed-rewards";
import { UserPointsBalance } from "src/models/user-points-balance";
import DeliveryOrderExtensionRepository from "src/repositories/delivery-order-extension";
import { DeliveryOrderExtension } from "src/models/delivery-order-extension";
import { Cart } from "src/models/cart";
import { Order } from "src/models/order";

class ClaimedRewardsService extends TransactionBaseService {
    protected readonly deliveryOrderExtensionRepository_: typeof DeliveryOrderExtensionRepository;
    protected readonly userPointsBalanceRepository_: typeof UserPointsBalanceRepository;
    protected readonly customerRepository_: typeof CustomerRepository;

    constructor({ deliveryOrderExtensionRepository, userPointsBalanceRepository, customerRepository, rewardRepository }) {
        super(arguments[0]);
        this.deliveryOrderExtensionRepository_ = deliveryOrderExtensionRepository;
        this.userPointsBalanceRepository_ = userPointsBalanceRepository;
        this.customerRepository_ = customerRepository;
    }

    async createWithCart(cart: Cart, data: Partial<DeliveryOrderExtension>): Promise<DeliveryOrderExtension> {
        return await this.atomicPhase_(async (manager) => {
            const deliveryOrderExtension = this.deliveryOrderExtensionRepository_.create({
                cart: cart,
                ...data
            })
            return this.deliveryOrderExtensionRepository_.save(deliveryOrderExtension)
        })
    }

    async addOrderToExtension(order: Order, id: string, data: Partial<DeliveryOrderExtension>): Promise<DeliveryOrderExtension> {
        return this.atomicPhase_(async (manager) => {
            const existing = await this.deliveryOrderExtensionRepository_.findOne({ where: { id: id } })
            if (!existing) {
                throw new Error("DeliveryOrderExtension not found")
            }
            this.deliveryOrderExtensionRepository_.merge(existing, { order: order, ...data })
            return await this.deliveryOrderExtensionRepository_.save(existing)
        })
    }

    async updateById(id: string, data: Partial<DeliveryOrderExtension>): Promise<DeliveryOrderExtension> {
        return this.atomicPhase_(async (manager) => {
            const existing = await this.deliveryOrderExtensionRepository_.findOne({ where: { id: id } })
            if (!existing) {
                throw new Error("DeliveryOrderExtension not found")
            }

            this.deliveryOrderExtensionRepository_.merge(existing, data)
            return await this.deliveryOrderExtensionRepository_.save(existing)
        })
    }

    async retrieve(deliveryOrderExtensionId: string): Promise<DeliveryOrderExtension> {
        const deliveryOrderExtension = await this.deliveryOrderExtensionRepository_.findOne({ where: { id: deliveryOrderExtensionId } })
        if (!deliveryOrderExtension) {
            throw new MedusaError(
                MedusaError.Types.NOT_FOUND,
                `DeliveryOrderExtension with id: ${deliveryOrderExtensionId} was not found`
            );
        }

        return deliveryOrderExtension;
    }

    async delete(deliveryOrderExtensionId: string): Promise<void> {
        return await this.atomicPhase_(async (manager) => {
          const deliveryOrderExtensionRepo = manager.withRepository(this.deliveryOrderExtensionRepository_);
          const deliveryOrderExtension = await this.retrieve(deliveryOrderExtensionId);
          await deliveryOrderExtensionRepo.remove(deliveryOrderExtension);
        });
    }
}

export default ClaimedRewardsService;